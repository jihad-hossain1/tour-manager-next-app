"use client";

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const TextEditor = ({ formData, handleOnChange }) => {
  return (
    <div>
      <ReactQuill
        style={{ height: "300px", marginBottom: "25px", marginTop: "5px" }}
        theme="snow"
        value={formData}
        onChange={handleOnChange}
      />
      <br />
    </div>
  );
};

export default TextEditor;
