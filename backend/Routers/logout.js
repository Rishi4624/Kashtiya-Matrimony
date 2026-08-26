const logout = (req, res) => {

    try{

        const isProduction = process.env.NODE_ENV === 'production';
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax'
        };
        res.clearCookie('token', {
            ...cookieOptions,
            path: '/api'
        });
        res.clearCookie('token', {
            ...cookieOptions,
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