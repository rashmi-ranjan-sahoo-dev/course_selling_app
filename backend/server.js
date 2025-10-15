import express from "express"
const app = express();
import mongoose from "mongoose";
import cors from "cors"
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv"
dotenv.config();


import userRouter from "./routes/user.js"
import courseRouter from "./routes/course.js"
import adminRouter from "./routes/admin.js"

app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

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