require('dotenv').config();


const { Router } = require("express");
const { userModel, purchaseModel, courseModel } = require("../db/db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const JWT_USER = JWT_USER_SECRET
const { userMiddleWare } = require("../middleware/userMid.js")

const userRouter = Router();

userRouter.post("/signup",async function (req,res) {

     const validedData = z.object({
            email:z.string().min(4).max(40).email(),
            password:z.string().min(8).regex(/[A-Z]/)
                                      .regex(/[a-z]/)
                                      .regex(/[0-9]/)
                                      .regex(/[^A-Za-z0-9]/,),
           firstName:z.string(),
           lastName:z.string()
        })
    
        const parsedDataWithsuccess = validedData.safeParse(req.body);
    
        if(!parsedDataWithsuccess.success){
            res.json({
                msg:"incorext format",
                error:parsedDataWithsuccess.error
            })
            return
        }
    
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
     try{
    
         const hashedpassword = await bcrypt.hash(password,5)
         const r = await userModel.create({
            email:email,
            password:hashedpassword,
            firstName:firstName,
            lastName:lastName
        })
    
         res.json({
            message: "you are signed up"
         })
     }catch (error){
        console.error("Error during user signup:", error);
        res.status(500).json({
            message: "An error occurred during signup",
            error: error.message
        });
     }
    
})

userRouter.post("/signin",async function (req,res) {
      
   const validedData = z.object({
     email:z.string().min(4).max(40).email(),
        password:z.string().min(8).regex(/[A-Z]/)
                                  .regex(/[a-z]/)
                                  .regex(/[0-9]/)
                                  .regex(/[^A-Za-z0-9]/,)
   })

    const parsedDataWithsuccess = validedData.safeParse(req.body);

    if(!parsedDataWithsuccess.success){
         res.json({
            msg:"incorect format",
            error:parsedDataWithsuccess.error
        })
        return
    }

    const { email,password} = req.body;

    try{
        const response = await userModel.findOne({
            email:email,
        })

        if(!response){
            res.status(403).json({
                msg:"user not found"
            })
        }

        // console.log(response)

        const passwordMatch = await bcrypt.compare(password,response.password)

        // console.log(passwordMatch)

        if(passwordMatch){
            const token = jwt.sign({id:response._id},JWT_USER.JWT_USER_SECRET)

            res.json({
                token
            })
        }else{
            res.status(403).json({
                message:"Incorrect creds"
            })
        }
    }catch (error) {
    console.error("Error during user signin:", error);
    res.status(500).json({
        message: "An error occurred during sign",
        error: error.message
    });
}
})

userRouter.get("/purchases",userMiddleWare,async function (req,res) {
    
  const userId = req.userId;

  const courses = await purchaseModel.find({
    userId
  })

  let purchaseCourseIds = [];

  for(let i = 0 ; i< courses.length ;i++){
    purchaseCourseIds.push(courses[i].courseId)
  }

  const courseData = await courseModel.find({
    _id: { $in: purchaseCourseIds }
  })

  res.json({
    courses,
    courseData
  })

})

module.exports = {
    userRouter:userRouter
}