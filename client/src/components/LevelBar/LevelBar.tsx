import "./LevelBar.css";

interface LevelBarProps {
  level: number;
}

export default function LevelBar({ level }: LevelBarProps) {
  const maxLevel = 5;

  return (
    <div className="level-bar">
      {Array.from({ length: level }, (_, index) => (
        <span className="level level--completed" key={index} />
      ))}
      {Array.from(
        { length: maxLevel - level >= 0 ? maxLevel - level : 0 },
        (_, index) => (
          <span className="level level--uncompleted" key={index} />
        )
      )}
    </div>
  );
}
