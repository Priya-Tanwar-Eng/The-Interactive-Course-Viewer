import Course from "../models/Course.js";
import LessonProgress from "../models/LessonProgress.js";
import Module from "../models/Module.js";  
import Lesson from "../models/Lesson.js";   


export const getAllCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    const course = await Course.findOne()
      .populate({
        path: "modules",
        populate: {
          path: "lessons",
        },
      });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const progress = await LessonProgress.find({
      userId,
      completed: true,
    });

    const completedLessonIds = progress.map(
      (p) => p.lessonId.toString()
    );

    // 3. Response structure build karo
    const response = {
      _id: course._id,
      courseTitle: course.courseTitle,
      description: course.description,
      modules: course.modules.map((module) => ({
        _id: module._id,
        title: module.title,
        lessons: module.lessons.map((lesson) => ({
          _id: lesson._id,
          lessonKey: lesson.lessonKey,
          title: lesson.title,
          duration: lesson.duration,
          completed: completedLessonIds.includes(
            lesson._id.toString()
          ),
        })),
      })),
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const completeLesson = async (req, res) => {
  try {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
      return res
        .status(400)
        .json({ message: "userId and lessonId required" });
    }

    // upsert = create if not exists
    const progress = await LessonProgress.findOneAndUpdate(
      { userId, lessonId },
      { completed: true },
      { new: true, upsert: true }
    );

    res.json({
      message: "Lesson marked as completed",
      progress,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
