const logout = (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        path: '/api'
    });

    res.json({
        success: true,
        message: "Logged out Successfully"
    });
    

}

module.exports = logout;