import React, { useState } from "react";
import "./Input.css";

function InputFile({ accept, id, fileHandleFunc, text }) {
  const [fileSelected, setFileSelected] = useState(false);
  const [fileName, setFileName] = useState("");
  const onChange = (e) => {
    // console.log(e.target.files);
    setFileSelected(true);
    fileHandleFunc(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  return (
    <div className={`custom-input ${!fileSelected ? "label-input" : "active-1"}`}>
      <label htmlFor={id}>
        {fileSelected ? "File Uploaded: " + fileName : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
}

export default InputFile;
