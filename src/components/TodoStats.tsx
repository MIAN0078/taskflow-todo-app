
interface TodoStatsProps {
  total: number;
  active: number;
  completed: number;
}

function TodoStats({ total, active, completed }: TodoStatsProps) {
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="todo-stats">
      <div className="stat-card">
        <span className="stat-icon">📋</span>
        <div>
          <p>Total Tasks</p>
          <h3>{total}</h3>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⏳</span>
        <div>
          <p>Active Tasks</p>
          <h3>{active}</h3>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">✅</span>
        <div>
          <p>Completed</p>
          <h3>{completed}</h3>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">📈</span>
        <div>
          <p>Progress</p>
          <h3>{percentage}%</h3>
        </div>
      </div>
    </div>
  );
}

export default TodoStats;
