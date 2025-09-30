require('dotenv').config();


const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

const adminMiddleWare = (req,res,next) =>{
     const token = req.headers.authorization?.split(" ")[1];

    console.log(JWT_ADMIN_SECRET)
    
    const decoded =  jwt.verify(token,JWT_ADMIN_SECRET);

    console.log(decoded);

    if(decoded){
        console.log(decoded.id)
      req.adminId = decoded.id;

      next();
    }else{
        res.status(403).json({
            message:"you are not signed in"
        })
    }

}

module.exports = {
    adminMiddleWare
}