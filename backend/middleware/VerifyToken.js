require('dotenv').config()
const jwt = require('jsonwebtoken')
const {sanitizeUser} = require ('../utils/SanitizeUser')

exports.verifyToken = async (req, res, next) => {
    try {
        const {token} = req.cookies

        if(!token) {
            return res.status(401).json({message:"The token is missing, please try to login again"})
        }
    
        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY)
    
        if(decodedInfo && decodedInfo._id && decodedInfo.email) {
            req.user = decodedInfo
            next()
        }
        else {
            return res.status(401).json({message:"Invalid token!"})
        }
    }catch (error) {
        console.log(error);

        if(error instanceof jwt.TokenExpiredError)
        {
            return res.status(401).json({ message: "The token has expired!" });
        }
        else if(error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid Token!" });
        }
        else {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
    
} 