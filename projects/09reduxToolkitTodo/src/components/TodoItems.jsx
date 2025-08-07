// We will import useSelector and useDispatch hooks from react-redux to access the store and dispatch actions
import { useSelector, useDispatch } from "react-redux";
import {
  removeTodo,
  toggleComplete,
  setEditingTodo,
  toggleAllComplete,
} from "../features/todo/todoSlice";

const TodoItems = () => {
  const todos = useSelector((state) => state.todos); // Access the todos from the Redux store
  const dispatch = useDispatch(); // Get the dispatch function from Redux

  // Calculate if all todos are completed for the master checkbox
  const allCompleted =
    todos.length > 0 && todos.every((todo) => todo.completed);

  const handleRemove = (id) => {
    dispatch(removeTodo(id)); // Dispatch the removeTodo action with the id
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id)); // Dispatch the toggleComplete action with the id
  };

  const handleEdit = (todo) => {
    dispatch(setEditingTodo(todo)); // Set the todo to be edited
  };

  const handleToggleAllComplete = () => {
    dispatch(toggleAllComplete()); // Dispatch the toggleAllComplete action with nothing, because it works with all todos (no specific)
  };
  return (
    <div className="todos-container">
      {/* Header with stats */}
      <div className="todos-header">
        <h2 className="todos-title">📋 My Todos</h2>
        <span className="todos-count">
          {todos.length} {todos.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Toggle All Section */}
      {todos.length > 0 && (
        <div className="toggle-all-container">
          <label className="toggle-all-label">
            <input
              type="checkbox"
              checked={allCompleted}
              onChange={() => handleToggleAllComplete()}
              className="checkbox"
            />
            <span className="toggle-all-text">
              {allCompleted ? "✅ Uncheck All" : "☑️ Check All"}
            </span>
          </label>
        </div>
      )}

      {/* Todo List */}
      <div className="todos-list">
        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3 className="empty-title">No todos yet!</h3>
            <p className="empty-text">
              Add your first todo above to get started.
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${
                todo.completed ? "completed" : ""
              }`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                  className="checkbox"
                />
                <span className="todo-text">{todo.todo}</span>
                <div className="todo-actions">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="btn btn-edit-small"
                    title="Edit todo">
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleRemove(todo.id)}
                    className="btn btn-remove"
                    title="Remove todo">
                    🗑️ Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoItems;
