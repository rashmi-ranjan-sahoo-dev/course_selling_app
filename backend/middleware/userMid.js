require('dotenv').config();

const jwt = require("jsonwebtoken");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

const userMiddleWare = (req,res,next) =>{
         const token = req.headers.authorization?.split(" ")[1];

    
    const decoded =  jwt.verify(token,JWT_USER_SECRET);
    console.log(JWT_USER_SECRET);

    if(decoded){
      req.userId = decoded.id;
      next();
    }else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }

}

module.exports = {
    userMiddleWare
}