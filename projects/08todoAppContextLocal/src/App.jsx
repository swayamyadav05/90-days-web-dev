import { useEffect, useState } from "react";
import "./App.css";
import { TodoProvider } from "./contexts/TodoContext";
import { TodoForm, TodoItem, TodoStats } from "./components/index";
import { initializeTheme, toggleTheme } from "./utils/theme";

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [currentTheme, setCurrentTheme] = useState("light");

  // Initialize theme on component mount
  useEffect(() => {
    const theme = initializeTheme();
    setCurrentTheme(theme);
  }, []);

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: crypto.randomUUID(), ...todo },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id != id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}>
      <div className="app-container">
        <button
          className="theme-toggle"
          onClick={handleThemeToggle}
          title="Toggle theme">
          {currentTheme === "dark" ? "☀️" : "🌙"}
        </button>

        <header className="app-header">
          <h1 className="app-title">Todo Manager</h1>
          <p className="app-subtitle">
            Organize your tasks with style
          </p>
        </header>

        {/* TodoStats */}
        <TodoStats />

        {/* TodoForm */}
        <TodoForm />

        {/* TodoItem List */}
        <div className="todos-container">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <div className="empty-state-text">No todos yet!</div>
              <div className="empty-state-subtext">
                Add your first task above to get started
              </div>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))
          )}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
