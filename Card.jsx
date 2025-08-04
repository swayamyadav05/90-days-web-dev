import React, { useContext } from "react";
import { ThemeContext } from "./practice_Template/07themeChanger/src/context/ThemeContext";
import "./styles/theme.css";

const Card = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`card ${theme}`}>
      <h2>This is a {theme} themed card!</h2>
      <p>Content goes here...</p>
    </div>
  );
};

export default Card;
