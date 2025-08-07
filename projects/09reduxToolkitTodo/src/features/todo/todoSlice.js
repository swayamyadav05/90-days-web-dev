// We create a /features/todo here with a js file named as todoSlice

import { createSlice, nanoid } from "@reduxjs/toolkit";

// After creating a config for the redux we now need to create reducers for it. In redux tool kit naming conventio we say it as Slices.

// We create slice here using createSlce()
// Reduxjs/toolkit also has nanoid method which is used for creating unique ids. (for key we can utilize this)

// Now we will create a initialState, how will the store be stated initially.
// We can add anything [] or {}

// Let's add {} for our case

const initialState = {
  todos: [],
  editingTodo: null, // Track which todo is being edited (null means not editing)
};

// Now we will see how the slices are made

// Slice is like almost bigger version of Reducer
// Reducer is a functionality

// Slices has names. Those slices will show with the same name while using Redux DevTools
export const todoSlice = createSlice({
  name: "todo", // the name is the property name given by Redux and we give the name of this property of the slice
  initialState, // The second thing we give is the initialState. We declared it outside of this todoSlice.
  // Now the important thing is the reducers
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        todo: action.payload, // We will get the todo from the action.payload
        completed: false,
      };
      state.todos.push(todo); // We will push the todo to the todos array in the state
    },
    removeTodo: (state, action) => {
      const id = action.payload; // We will get the id from the action.payload
      state.todos = state.todos.filter((todo) => todo.id !== id); // We will filter the todos array to remove the todo with the given id
    },
    updateTodo: (state, action) => {
      const { id, todo } = action.payload; // We will get the id and todo from the action.payload
      const existingTodo = state.todos.find((t) => t.id === id); // We will find the todo with the given id
      if (existingTodo) {
        existingTodo.todo = todo; // If the todo exists, we will update the todo with the given todo
      }
    },
    toggleComplete: (state, action) => {
      const id = action.payload; // We will get the id from the action.payload
      const existingTodo = state.todos.find((todo) => todo.id === id); // We will find the todo with the given id
      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed; // Toggle the completed status
      }
    },
    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload; // Set the todo being edited (or null to cancel)
    },
    toggleAllComplete: (state) => {
      const allCompleted = state.todos.every(
        (todo) => todo.completed === true
      );

      if (!allCompleted) {
        state.todos.forEach((todo) => {
          todo.completed = true;
        });
      } else {
        state.todos.forEach((todo) => {
          todo.completed = false;
        });
      }
    },
  }, // we can give properties and functions in it
  // Here it comes the change w.r.t ContextAPI
  // In ContextAPI, We used to do functions declarations not used to write the definitions.
  // Here in ReduxToolkit we not only write the declarition of the function but also the definition

  // When ever we take the properties, and we will use ex: addTodo(), we will get access to two things: State and Action-
  // State variable gives you the access to the current value of/in the initialState
  // Action gives you the executed or required resulted values
});

// Now we will export the actions and the reducer
export const {
  addTodo,
  removeTodo,
  updateTodo,
  toggleComplete,
  setEditingTodo,
  toggleAllComplete,
} = todoSlice.actions;
// We will export the reducer as default
export default todoSlice.reducer;
// This reducer will be used in the store.js file to create the store
// We will import this reducer in the store.js file and add it to the configureStore
// The store.js file is where we configure the store and add the reducers to it
