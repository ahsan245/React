import React, { useState } from "react";
export default function TextForm(props) {
  const [text, setText] = useState("ssssss");
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase","success");
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase","success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
    props.showAlert("Text has been changed","success");
  };
    const handleClearClic = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text has been cleared","success");
    };
  return (
    <>
      <div className="container2" style={{color: props.mode==='dark'?'white':'black'}}>
        <h1 >{props.heading}</h1>
        <div className="mb-3">
          <textarea
          placeholder="Enter your text here"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={text}
            onChange={handleOnChange}
            style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'black'}}
          ></textarea>
        </div>
        <button className="btn btn-primary my-3 mx-2" onClick={handleUpClick}>
          Convert to Upper Case
        </button>
        <button className="btn btn-primary my-3 mx-2" onClick={handleLoClick}>
          Convert to Lower Case
        </button>
        <button className="btn btn-primary my-3 mx-2" onClick={handleClearClic}>
            Clear Text
        </button>
      </div>

      <div className="container my-2"style={{color: props.mode==='dark'?'white':'black'}}>
        <div className="row">
          <div className="col-md-6">
            <h2>Your text summary</h2>
            <p>
              {text.split(" ").length} words and {text.length} characters
            </p>
            <p>{0.008 * text.split(" ").length} Minutes read</p>
          </div>
          <div >
            <h2>Preview</h2>
            <p aria-placeholder="">{text.length > 0 ? text: "Enter text to Preview" }</p>
          </div>
        </div>
      </div>
    </>
  );
}
