import mongoose from "mongoose"

const lessonProgressSchema = new mongoose.Schema({
  userId: String,
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const LessonProgress = mongoose.model("LessonProgress", lessonProgressSchema);

export default LessonProgress