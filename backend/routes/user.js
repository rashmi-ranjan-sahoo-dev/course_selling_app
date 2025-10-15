
import { Router } from "express";
import { userModel,purchaseModel,courseModel } from "../db/db.js";
import z from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { userMiddleWare } from "../middleware/userMid.js";
import dotenv from "dotenv"
dotenv.config();

const userRouter = Router();
const JWT_USER = process.env.JWT_USER_SECRET

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

        console.log(email)
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
           return  res.status(403).json({
                msg:"user not found"
            })
        }

        // console.log(response)

        const passwordMatch = await bcrypt.compare(password,response.password)

        // console.log(passwordMatch)

        if(passwordMatch){
            const token = jwt.sign({id:response._id},JWT_USER)

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

export default userRouter;