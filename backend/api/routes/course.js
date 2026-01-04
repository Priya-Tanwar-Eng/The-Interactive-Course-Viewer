import express from "express";
import { getAllCourse, completeLesson } from "../controller/course.js";

const router = express.Router();

router.get("/course", getAllCourse);
router.post("/complete", completeLesson);

export default router;
