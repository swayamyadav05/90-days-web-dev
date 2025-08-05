import useTodo from "../contexts/TodoContext";

const TodoStats = () => {
  const { todos } = useTodo();

  const totalTodos = todos.length;
  const completedTodos = todos.filter(
    (todo) => todo.completed
  ).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionPercentage =
    todos.length > 0
      ? Math.round((completedTodos / totalTodos) * 100)
      : 0;

  return (
    <div className="stats-container">
      <h2 className="stats-title">Progress Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span
            className="stat-number"
            style={{ color: "var(--success)" }}>
            {completedTodos}
          </span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span
            className="stat-number"
            style={{ color: "var(--warning)" }}>
            {pendingTodos}
          </span>
          <span className="stat-label">Pending</span>
        </div>
        <div className="stat-item">
          <span className="stat-number stat-percentage">
            {completionPercentage}%
          </span>
          <span className="stat-label">Progress</span>
        </div>
      </div>
      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
