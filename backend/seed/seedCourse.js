import mongoose from "mongoose";
import dotenv from "dotenv";
import { createRequire } from "module";

import Course from "../api/models/Course.js";
import Module from "../api/models/Module.js";
import Lesson from "../api/models/Lesson.js";

const require = createRequire(import.meta.url);
const courseData = require("../course_data.json");

dotenv.config({ path: "../.env" });

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    await Course.deleteMany();
    await Module.deleteMany();
    await Lesson.deleteMany();

    console.log("Old data removed");

    const course = await Course.create({
      courseTitle: courseData.courseTitle,
      description: courseData.description,
      modules: [],
    });

    for (const moduleData of courseData.modules) {
      const module = await Module.create({
        title: moduleData.title,
        courseId: course._id,
        lessons: [],
      });

      for (const lessonData of moduleData.lessons) {
        const lesson = await Lesson.create({
          lessonKey: lessonData.lessonKey,
          title: lessonData.title,
          duration: lessonData.duration,
          moduleId: module._id,
        });

        module.lessons.push(lesson._id);
      }

      await module.save();
      course.modules.push(module._id);
    }

    await course.save();

    console.log("Course seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Seeding failed", error);
    process.exit(1);
  }
};

seedDB();
