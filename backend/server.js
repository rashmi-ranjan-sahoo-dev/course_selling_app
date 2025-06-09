const express = require("express");
const app = express();
const mongoose = require("mongoose");
const axios = require("axios");

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use(express.json());
app.use(axios());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

async function main() {
    await mongoose.connect("mongodb+srv://rinkuasahoo04:rinku1234@cluster0.9as9pzb.mongodb.net/my_course");
    app.listen(3000,() => console.log("listening on port 3000"))
}

main();