import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector to access state
import {
  addTodo,
  updateTodo,
  setEditingTodo,
} from "../features/todo/todoSlice"; // Import updateTodo and setEditingTodo

// TodoForm component to add new todos
// This component will be used to add new todos to the store
// We will use the useDispatch hook to dispatch the addTodo action
// The addTodo action will be imported from the todoSlice.js file

const TodoForm = () => {
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const editingTodo = useSelector((state) => state.editingTodo); // Get the editing todo from Redux state

  // Effect to populate input when editing
  useEffect(() => {
    if (editingTodo) {
      setTodo(editingTodo.todo); // Set the input value to the editing todo's text
    }
  }, [editingTodo]);

  // Now how to use the dispatch function to add a todo

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    if (editingTodo) {
      // If we're editing, dispatch updateTodo
      dispatch(updateTodo({ id: editingTodo.id, todo: todo.trim() }));
      dispatch(setEditingTodo(null)); // Clear editing mode
    } else {
      // If we're adding, dispatch addTodo
      dispatch(addTodo(todo.trim()));
    }

    setTodo(""); // Clear the input field
  };

  // The form will have an input field to enter the todo and a button to submit the form

  // The input field will be controlled by the todo state
  // The button will call the handleSubmit function when clicked

  // Also when the update button is clicked in the TodoItems component, we will set the todo state to the todo text of the todo being updated
  // This will allow the user to edit the todo and update it
  // The Add Todo button will change to Update Todo button when the todo state is not empty
  // When the form is submitted, we will dispatch the addTodo action with the todo text

  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingTodo ? "✏️ Edit Todo" : "➕ Add New Todo"}
      </h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            placeholder={
              editingTodo
                ? "Edit your todo..."
                : "What needs to be done?"
            }
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className={editingTodo ? "btn btn-edit" : "btn btn-add"}>
            {editingTodo ? "✅ Update" : "➕ Add"}
          </button>
        </div>

        {editingTodo && (
          <button
            type="button"
            onClick={() => {
              dispatch(setEditingTodo(null));
              setTodo("");
            }}
            className="btn btn-cancel">
            ❌ Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
