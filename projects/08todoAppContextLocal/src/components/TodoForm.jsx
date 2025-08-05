import { useState } from "react";
import useTodo from "../contexts/TodoContext";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ todo: todo.trim(), completed: false });
    setTodo("");
  };

  return (
    <div className="todo-form">
      <form onSubmit={handleSubmit} className="form-group">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
