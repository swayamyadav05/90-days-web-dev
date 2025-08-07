import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

// The Provider component will be used to provide the store to the App component
// We will wrap the App component with the Provider component and pass the store as a prop
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* The Provider component will provide the store to the App component */}
    <App />
  </Provider>
);
