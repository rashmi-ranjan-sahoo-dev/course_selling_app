require('dotenv').config();

const { Router, json } = require("express")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db/db.js")
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const JWT_ADMIN = process.env.JWT_ADMIN_SECRET
const { adminMiddleWare } = require("../middleware/adminMid.js");


adminRouter.post("/signup",async function (req,res){
 
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
            msg:"incorect format",
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
     const r = await adminModel.create({
        email:email,
        password:hashedpassword,
        firstName:firstName,
        lastName:lastName
    })

     res.json({
        message: "you are signed up"
     })
 }catch (error){
    console.error("Error during admin signup:", error);
    res.status(500).json({
        message: "An error occurred during signup",
        error: error.message
    });
 }
  
}); 

adminRouter.post("/signin",async function (req,res){
    
   const validedData = z.object({
     email:z.string().min(4).max(40).email(),
        password:z.string().min(8).regex(/[A-Z]/)
                                  .regex(/[a-z]/)
                                  .regex(/[0-9]/)
                                  .regex(/[^A-Za-z0-9]/)
   })

    const parsedDataWithsuccess = validedData.safeParse(req.body);

    if(!parsedDataWithsuccess.success){
       res.json({
        msg:"increct format",
        error:parsedDataWithsuccess.error
       })
        return
    }

    const { email ,password} = req.body;

    try{
        const response = await adminModel.findOne({
            email:email,
        })
        if(!response){
            res.status(403).json({
                msg:"user not found"
            })
        }

        console.log(response.password)

        const passwordMatch = bcrypt.compare(password,response.password)

        if(passwordMatch){
            const token = jwt.sign({id:response._id.toString()},JWT_ADMIN)
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message:"Incorrect creds"
            })
        }
    }catch (error) {
    console.error("Error during admin signin:", error);
    res.status(500).json({
        message: "An error occurred during signin",
        error: error.message
    });
}

}); 

adminRouter.post("/course",adminMiddleWare,async function (req,res){
    
    const adminId = req.adminId;

    const { title, description, imageUrl, price, videos} = req.body

    if(!title || !description || !price || !imageUrl){
        return res.status(400).json({error: "Missing required fields"});
    }

    let validVideos = [];
    if(Array.isArray(videos)){
        validVideos = videos.map((video) =>({
            title:video.title|| "",
            url: video.url || "",
            duration: video.duration || 0,
            isPreview: video.isPreview || false,
        }))
    }

    const course = await courseModel.create({
        title:title,
        description:description,
        price:price,
        creatorId:adminId,
        imageUrl:imageUrl,
        videos:validVideos
    })

    res.json({
        message:"Course created",
        courseId:course._id
    })
    

}); 

adminRouter.put("/course",adminMiddleWare,async function (req,res){
    try{
    const adminId = req.adminId;
    // console.log(adminId)

    const { title, description,price,imageUrl,courseId ,videos} = req.body;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const updateData = {
      title,
      description,
      price,
      imageUrl,
    };

     if (Array.isArray(videos)) {
      updateData.videos = videos.map((video) => ({
        title: video.title || "",
        url: video.url || "",
        duration: video.duration || 0,
        isPreview: video.isPreview || false,
      }));
    }

     const updatedCourse = await courseModel.findOneAndUpdate(
      { _id: courseId, creatorId: adminId },
      updateData,
      { new: true } // Return the updated document
    );
     if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found or you are not authorized to update it" });
    }

    res.json({
        message:"Course updated",
        course:updatedCourse
    })
}catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
    
}); 

adminRouter.get("/course/bulk",adminMiddleWare,async function (req,res){

    const adminId = req.adminId

    const courses = await courseModel.find({
        creatorId:adminId
    })

    res.json({
        courses
    })
}); 

adminRouter.delete("/course", adminMiddleWare, async function (req, res) {
  try {
    const adminId = req.adminId;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const deleteResult = await courseModel.deleteOne({ _id: courseId, creatorId: adminId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "Course not found or not authorized to delete" });
    }

    // Fetch updated course list for this admin
    const courses = await courseModel.find({ creatorId: adminId });

    res.json({
      message: "Course deleted successfully",
      courses,
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = {
    adminRouter: adminRouter
}