export default function ProgressBar({ modules }) {
  const lessons = modules.flatMap((m) => m.lessons);
  const completed = lessons.filter((l) => l.completed).length;

  const percent = Math.round((completed / lessons.length) * 100);

  return (
    <div style={{ margin: "20px" }}>
      <div className="progress-text">{percent}% Completed</div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
