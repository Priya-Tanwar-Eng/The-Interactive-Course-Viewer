export default function LessonItem({ lesson, isLocked, onComplete }) {
  return (
    <div
      className={`lesson ${isLocked ? "locked" : ""}`}
      style={{ marginLeft: "20px" }}
    >
      <input
        type="checkbox"
        checked={lesson.completed}
        disabled={isLocked || lesson.completed}
        onChange={() => onComplete(lesson._id)}
      />
      <span>
        {lesson.title} ({lesson.duration})
      </span>

      {isLocked && (
        <small className="lock-text">Complete previous lesson</small>
      )}
    </div>
  );
}
