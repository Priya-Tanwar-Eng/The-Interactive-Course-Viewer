import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  courseTitle: String,
  description: String,
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
});

const Course= mongoose.model("Course", courseSchema);
export default Course
