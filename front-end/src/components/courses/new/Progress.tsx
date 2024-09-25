import "./Progress.scss";

type ProgressProps = {
  percentage: number;
};

function Progress({ percentage }: ProgressProps) {
  return (
    <div className="Progress">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        {percentage}%
      </div>
    </div>
  );
}

export default Progress;
