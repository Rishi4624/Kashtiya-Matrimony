const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


async function Auth(req, res, next) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: No token provided', success: false});
    }

    try{
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized: Invalid token', success: false});
    }

}

module.exports =  Auth;