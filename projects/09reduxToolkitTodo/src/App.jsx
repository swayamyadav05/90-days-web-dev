import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItems from "./components/TodoItems";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">🚀 Redux Toolkit Todo</h1>
        <p className="app-subtitle">
          Master Redux with this beautiful todo app
        </p>
      </header>

      {/* Main Content */}
      <main>
        {/* The TodoForm component will be used to add new todos */}
        <TodoForm />
        {/* The TodoItems component will be used to display the list of todos */}
        <TodoItems />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Built with ❤️ using <strong>Redux Toolkit</strong> &{" "}
          <strong>React</strong>
        </p>
      </footer>
    </div>
  );
}

// We can wrap the App component with the Provider component from react-redux but we can also do it in the main.jsx file

export default App;
