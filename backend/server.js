const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./dbConnection');
const User = require("./models/userSchema");
const Message = require('./models/messageSchema');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Auth = require('./middleware/authMiddleware');
const uploadRouter = require('./Routers/uploadRouter');
const uploadAvatar = require('./Routers/uploadAvatar');
const uploadPost = require('./Routers/uploadPost');
const { Server } = require('socket.io');
connectDB();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_URL, credentials: true }
});
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));
app.use(express.json({ limit: '10mb' }));

// app.use('/', Auth);
app.get('/api/auth/me', async (req, res) => {
        const token = req.cookies.token;
    
        if(!token){
            return res.status(401).json({ message: 'Unauthorized: No token provided', success: false});
        }
    
        try{
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return res.status(200).json({message: 'Valid user', success: true});
            
        }catch(error){
            return res.status(401).json({ message: 'Unauthorized: Invalid token', success: false});
        }   
});


app.post("/api/login", require('./Routers/login'));

app.post("/api/register", require('./Routers/register'));

app.get('/api/logout', require('./Routers/logout'));

app.get("/api/user",Auth,  require("./Routers/user"));

app.post('/api/updateUser', Auth, require('./Routers/updateUser'));

app.post('/api/upload-image', Auth, uploadRouter, (req, res) => {
    res.json({ success: true, imageUrl: req.image_url });
});

app.use('/api/upload-avatar', Auth, uploadRouter, uploadAvatar);
app.use('/api/upload-post', Auth, uploadRouter, uploadPost);

app.use('/api/get-profiles', Auth, require('./Routers/getProfiles'));

app.use('/api/add-interest', Auth, require('./Routers/addInterest'));
app.use('/api/accept-interest', Auth, require('./Routers/acceptInterest'));
app.use('/api/reject-interest', Auth, require('./Routers/rejectInterest'));
app.use('/api/shortlist', Auth, require('./Routers/toggleShortlist'));

const getRoomId = (firstUserId, secondUserId) => [String(firstUserId), String(secondUserId)].sort().join(':');

const canChat = async (firstUserId, secondUserId) => {
    const users = await User.find({ _id: { $in: [firstUserId, secondUserId] } }).select('likes acceptedChats');
    if (users.length !== 2) return false;

    const firstUser = users.find((user) => String(user._id) === String(firstUserId));
    const secondUser = users.find((user) => String(user._id) === String(secondUserId));
    const firstAccepted = (firstUser.acceptedChats || []).some((id) => String(id) === String(secondUserId));
    const secondAccepted = (secondUser.acceptedChats || []).some((id) => String(id) === String(firstUserId));
    const mutualLike = firstUser.likes.some((id) => String(id) === String(secondUserId)) &&
        secondUser.likes.some((id) => String(id) === String(firstUserId));

    return firstAccepted || secondAccepted || mutualLike;
};

io.use((socket, next) => {
    try {
        const cookies = socket.handshake.headers.cookie || '';
        const token = cookies.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith('token='))?.slice(6);
        if (!token) return next(new Error('Unauthorized'));
        socket.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return next(new Error('Unauthorized'));
    }
});

io.on('connection', (socket) => {
    socket.on('join-chat', async (otherUserId, callback) => {
        const roomId = getRoomId(socket.user.id, otherUserId);
        const allowed = await canChat(socket.user.id, otherUserId);
        if (!allowed) return callback?.({ success: false, message: 'Chat is available after acceptance' });
        socket.join(roomId);
        const history = await Message.find({ roomId }).sort({ createdAt: 1 }).limit(200).lean();
        return callback?.({
            success: true,
            roomId,
            messages: history.map((message) => ({
                senderId: String(message.senderId),
                text: message.text,
                createdAt: message.createdAt
            }))
        });
    });

    socket.on('send-message', async ({ otherUserId, text }, callback) => {
        const message = String(text || '').trim();
        if (!message || message.length > 1000 || !(await canChat(socket.user.id, otherUserId))) {
            return callback?.({ success: false, message: 'Message not allowed' });
        }

        const savedMessage = await Message.create({
            roomId: getRoomId(socket.user.id, otherUserId),
            senderId: socket.user.id,
            receiverId: otherUserId,
            text: message
        });
        const payload = {
            senderId: String(savedMessage.senderId),
            text: savedMessage.text,
            createdAt: savedMessage.createdAt
        };
        io.to(getRoomId(socket.user.id, otherUserId)).emit('new-message', payload);
        return callback?.({ success: true });
    });

    socket.on('delete-chat', async (otherUserId, callback) => {
        try {
            const allowed = await canChat(socket.user.id, otherUserId);
            if (!allowed) return callback?.({ success: false, message: 'Chat access denied' });

            const roomId = getRoomId(socket.user.id, otherUserId);
            await Message.deleteMany({ roomId });
            io.to(roomId).emit('chat-deleted');
            return callback?.({ success: true });
        } catch (error) {
            return callback?.({ success: false, message: 'Unable to delete chat' });
        }
    });
});


const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
