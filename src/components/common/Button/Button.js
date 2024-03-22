import React from "react";
import "./Button.css";

function Button({ text, onclick, disabled }) {
  return (
    <div className="custom-button" onClick={onclick} disabled={disabled}>
      {text}
    </div>
  );
}

export default Button;
