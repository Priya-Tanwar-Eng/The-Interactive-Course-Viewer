import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({
  lessonKey: String, // l1, l2
  title: String,
  duration: String,
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson
