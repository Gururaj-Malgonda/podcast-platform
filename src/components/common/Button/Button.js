import React from "react";
import "./Button.css";

function Button({ text, onclick, disabled, width }) {
  return (
    <div
      className="custom-button"
      onClick={onclick}
      disabled={disabled}
      style={{ width: width }}
    >
      {text}
    </div>
  );
}

export default Button;
