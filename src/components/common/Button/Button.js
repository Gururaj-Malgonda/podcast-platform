import React from "react";
import "./Button.css";

function Button({ text, onclick }) {
  return <div className="custom-button" onClick={onclick}>{text}</div>;
}

export default Button;
