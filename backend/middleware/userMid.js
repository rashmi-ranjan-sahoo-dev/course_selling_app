import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken";

const JWT_USER_SECRET = process.env.JWT_USER_SECRET;

export const userMiddleWare = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_USER_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(403).json({ message: "You are not signed in" });
  }
};
