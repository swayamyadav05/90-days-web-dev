import React from "react";
import "./App.css";
import { useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to the store",
      description: "Get some milk",
      completed: false,
    },
  ]);

  function addTodo() {
    let newTodo = [
      ...todos,
      {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        completed: false,
      },
    ];
    setTodos(newTodo);
  }

  return (
    <div>
      <input id="title" type="text" placeholder="Title" />
      <input id="description" type="text" placeholder="Description" />
      <button onClick={addTodo}>Add Todo</button>
      {/* {JSON.stringify(todos)} */}
      {todos.map((todo) => (
        <Todo
          title={todo.title}
          description={todo.description}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}

function Todo(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.description}</h2>
      <h3>{props.done ? "Task completed" : "Task not completed"}</h3>
      <hr />
    </div>
  );
}
