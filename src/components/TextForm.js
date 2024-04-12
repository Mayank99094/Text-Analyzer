/* eslint-disable no-unused-vars */
import React, { useState, useSyncExternalStore } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase!", "success");
  };

  const handleLwClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase!", "success");
  };

  const handleClClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text cleared!", "success");
  };

  const handleCptxtClick = () => {
    let words = text.split(" ");
    const capitalizedWords = words.map((word) => {
      // Capitalize the first character and convert the rest to lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    let newText = capitalizedWords.join(" ");

    setText(newText);
    props.showAlert("Converted to capitalized text!", "success");
  };

  const handleDownloadtxtClick = () => {
    const filename = "example.txt";
    let blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    // console.log(url);
    const link = document.createElement("a");
    // Set link's href attribute to the temporary URL
    link.href = url;

    // Set link's download attribute to the filename
    link.download = filename;

    // Append the link to the body
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up: remove the link and revoke the temporary URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log(url);
    props.showAlert("File Download Sucessfully!", "success");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Text Copied!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra space removed!", "success");
  };

  return (
    <>
      <div>
        <h1 style={{ color: props.mode === "light" ? "black" : "white" }}>
          {" "}
          {props.heading}{" "}
        </h1>
        <div className="mb-3">
          <textarea
            style={{
              backgroundColor: props.mode === "light" ? "white" : "black",
              color: props.mode === "light" ? "black" : "white",
            }}
            className="form-control border border-dark"
            value={text}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>

          <button
            disabled={text.length === 0}
            className={`btn my-3 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleUpClick}
          >
            Change to UpperCase
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 mx-2 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleLwClick}
          >
            Change to LowerCase
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            id="cleartxt"
            onClick={handleClClick}
          >
            Clear text
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 mx-2 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleCptxtClick}
          >
            Capitalized text
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleDownloadtxtClick}
          >
            Download text
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 mx-1   btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleCopy}
          >
            Copy
          </button>

          <button
            disabled={text.length === 0}
            className={`btn my-3 btn-outline-${
              props.mode === "light" ? "dark" : "light"
            } btn-sm`}
            onClick={handleExtraSpaces}
          >
            Remove Extra Spaces
          </button>
        </div>
      </div>

      <div
        className="container"
        style={{ color: props.mode === "light" ? "black" : "white" }}
      >
        <h2>Your text summary</h2>
        <p>
          {
            text
              .trim()
              .split(/\s+/)
              .filter((word) => word !== "").length
          }{" "}
          words and {text.length} characters
        </p>
        <p>
          {0.008 *
            text
              .trim()
              .split(/\s+/)
              .filter((word) => word !== "").length}{" "}
          Minutes read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
