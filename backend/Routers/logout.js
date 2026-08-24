const cookieParser = require('cookie-parser');

const logout = (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.json({
        success: true,
        message: "Logged out Successfully"
    });
    

}

module.exports = logout;