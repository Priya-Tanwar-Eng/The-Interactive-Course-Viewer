import { useEffect, useState } from "react";
import { getCourse, completeLesson } from "../api/courseApi";
import ProgressBar from "../components/ProgressBar";
import ModuleAccordion from "../components/ModuleAccordion";
import "../styles/course.css";

export default function CoursePage() {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchCourse();
  }, []);

 const fetchCourse = async () => {
  const res = await getCourse();
  console.log(res.data);
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
      fetchCourse();
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
