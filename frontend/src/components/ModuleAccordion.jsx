import LessonItem from "./LessonItem";
import { useState } from "react";

export default function ModuleAccordion({ modules, onComplete }) {
  const [open, setOpen] = useState(null);

  return modules.map((module, index) => (
    <div key={module._id}>
      <h3
        onClick={() => setOpen(open === index ? null : index)}
        className="module-title"
      >
        {module.title}
        <span className="arrow">{open === index ? "▲" : "▼"}</span>
      </h3>

      {open === index &&
        module.lessons.map((lesson, lessonIndex) => {
          const isLocked =
            lessonIndex > 0 && !module.lessons[lessonIndex - 1].completed;

          return (
            <LessonItem
              key={lesson._id}
              lesson={lesson}
              isLocked={isLocked}
              onComplete={onComplete}
            />
          );
        })}
    </div>
  ));
}
