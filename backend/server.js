const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const { adminRouter } = require("./routes/admin")

app.use(express.json());
app.use(cors());

const port = process.env.PORT
const mongo_url = process.env.MONGO_URL

app.use("/api/v1/user",userRouter)
app.use("/api/v1/course",courseRouter)
app.use("/api/v1/admin",adminRouter)

async function main() {
    await mongoose.connect(mongo_url);
    app.listen(port,() => console.log("listening on port 3000"))
}

main();