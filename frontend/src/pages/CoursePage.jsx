import { useEffect, useState } from "react";
import { getCourse, completeLesson } from "../api/courseApi";
import ProgressBar from "../components/ProgressBar";
import ModuleAccordion from "../components/ModuleAccordion";
import "../styles/course.css";

// const COURSE_ID = "6958c0d2f58e741ff374193a";

export default function CoursePage() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourse();
  }, []);

 const fetchCourse = async () => {
  const res = await getCourse();
  setCourse(res.data);
};


  const handleComplete = async (lessonId) => {
    setCourse((prev) => ({
      ...prev,
      modules: prev.modules.map((m) => ({
        ...m,
        lessons: m.lessons.map((l) =>
          l._id === lessonId ? { ...l, completed: true } : l
        ),
      })),
    }));

    try {
      await completeLesson(lessonId);
    } catch {
      fetchCourse(); // rollback if error
    }
  };

  if (!course) return <p>Loading...</p>;

  return (
    <>
      <ProgressBar modules={course.modules} />
      <ModuleAccordion modules={course.modules} onComplete={handleComplete} />
    </>
  );
}
