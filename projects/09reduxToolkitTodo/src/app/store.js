import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";

// We will create a store using configureStore() method from Redux Toolkit
// We will import the todoReducer from the todoSlice.js file and add it to the store

export const store = configureStore({
  reducer: todoReducer,
  // We can add multiple reducers here if we have more slices
  // For now, we have only one slice, so we will add only one reducer
});

// The store will be used in the index.js file to provide the store to the App component

// Now our store is ready to be used in the App component

// We will use useSelector and useDispatch hooks from react-redux to access the store and dispatch actions
// We will import these hooks in the components where we want to access the store and dispatch actions
// The useSelector hook will be used to access the state from the store
// The useDispatch hook will be used to dispatch actions to the store
// We will use these hooks in the components where we want to display the todos and add new todos
