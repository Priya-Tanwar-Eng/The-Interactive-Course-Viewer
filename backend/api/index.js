import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conn from "./config/db.js";
import courseRoute from "./routes/course.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", courseRoute);

let isConnected = false;

const connectDB = async () => {
  if (!isConnected) {
    await conn();
    isConnected = true;
    console.log("MongoDB Connected ");
  }
};

connectDB().catch(err => console.log(err));

export default app;
