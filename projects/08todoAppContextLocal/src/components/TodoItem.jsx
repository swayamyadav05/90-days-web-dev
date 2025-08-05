import { useState } from "react";
import useTodo from "../contexts/TodoContext";

const TodoItem = ({ todo }) => {
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const { deleteTodo, updateTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    if (todoMsg.trim()) {
      updateTodo(todo.id, { ...todo, todo: todoMsg.trim() });
      setIsTodoEditable(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && isTodoEditable) {
      editTodo();
    }
    if (e.key === "Escape") {
      setTodoMsg(todo.todo);
      setIsTodoEditable(false);
    }
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      <input
        type="text"
        className="todo-text-input"
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        onKeyDown={handleKeyPress}
        readOnly={!isTodoEditable}
        placeholder="Todo text..."
      />

      <div className="todo-actions">
        <button
          className="btn-secondary"
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else {
              setIsTodoEditable(true);
            }
          }}
          disabled={todo.completed}
          title={isTodoEditable ? "Save changes" : "Edit todo"}>
          {isTodoEditable ? "Save" : "Edit"}
        </button>

        <button
          className="btn-danger"
          onClick={() => {
            if (
              window.confirm(
                "Are you sure you want to delete this todo?"
              )
            ) {
              deleteTodo(todo.id);
            }
          }}
          title="Delete todo">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
