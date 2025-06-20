const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config")

const adminMiddleWare = (req,res,next) =>{
    const token = req.headers.token;

    console.log(JWT_ADMIN_SECRET)
    
    const decoded =  jwt.verify(token,JWT_ADMIN_SECRET);

    console.log(decoded);

    if(decoded){
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