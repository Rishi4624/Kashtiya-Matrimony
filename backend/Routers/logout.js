const logout = (req, res) => {

    try{

        
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/api'
        });
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });
        
        res.status(200).json({
            success: true,
            message: "Logged out Successfully"
        });
    }catch(error){
        res.status(500).json({success:false, message: "Logout failed"})
    }
    

}

module.exports = logout;