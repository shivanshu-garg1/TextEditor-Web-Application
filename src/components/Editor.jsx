// !    rfc
import React, { useState, useEffect } from "react";
import "../cssFiles/Editor.css";

// ^ for capitalize
const capitalize = (str) => {
  return str
    .toLowerCase() // ?Convert the entire string to lowercase
    .split(" ") // ?Split the string into an array of words using space as a delimiter
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ?For each word in the array, capitalize the first letter and concatenate it with the rest of the word
    .join(" "); // ?Join the words back into a string with spaces in between
};

export default function TextVibeForm(props) {
  const [text, setText] = useState("");
  const [fontFamily, setFontFamily] = useState("Arial, sans-serif");
  const [isBold, setIsBold] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  // ^ for font family
  useEffect(() => {
    const select = document.getElementById("fontSelect");

    const selectedOption = select.querySelector(".selected-font-option");
    if (selectedOption) {
      select.removeChild(selectedOption);
    }

    const option = document.createElement("option");
    option.value = fontFamily;
    option.textContent = fontFamily;
    option.className = "selected-font-option";
    select.insertBefore(option, select.firstChild);
  }, [fontFamily]);

  const setFontFamilyHandler = (event) => {
    setFontFamily(event.target.value);
    props.showAlert(`Converted to ${event.target.value}`, "success");
  };

  // ^ for uppercase
  const handelonclick = () => {
    let Newtxt = text.toUpperCase();
    const hi = "uppercase";

    if (Newtxt) {
      setText(Newtxt);
      props.showAlert("Text Converted  to : " + hi, "success");
    } else {
      props.showAlert("No text Found", "danger");
    }
  };

  // ^ for lowercase
  const handellowclick = () => {
    let Newtxt = text.toLowerCase();
    const hi = "  Lowercase";

    if (Newtxt) {
      setText(Newtxt);
      props.showAlert("Text Converted  to : " + hi, "success");
    } else {
      props.showAlert("No text Found", "danger");
    }
  };

  // ^ for capitalize
  const handelcapclick = () => {
    let Newtxt = capitalize(text);
    const hi = "Capitalize";

    if (Newtxt) {
      setText(Newtxt);
      props.showAlert("Your text is : " + hi, "success");
    } else {
      props.showAlert("No text Found", "danger");
    }
  };
  // ^ for bold
  const toggleBold = () => {
    setIsBold(!isBold);
    props.showAlert(isBold ? "Text Unbolded" : "Text Bolded", "success");
  };
  // ^ for underline the text
  const handleUnderlineClick = () => {
    setIsUnderline(!isUnderline);
    props.showAlert(isUnderline ? "Text nope" : "Text Underlined", "success");
  };

  // ^ for clear
  const handelclearclick = () => {
    setText("");
    document.getElementById("box").value = "";
    document.getElementById("preview").innerHTML = "";
    props.showAlert("Text Cleared", "success");
  };

  // ^ for updating preview when text changes
  const handelonchange = (event) => {
    setText(event.target.value);
    updatePreview(event.target.value);
  };

  // ^ Function to update the preview area with the new text
  const updatePreview = (newText) => {
    const preview = document.getElementById("preview");
    const textDecoration = isUnderline ? "underline" : "none";
    const fontWeight = isBold ? "bold" : "normal";
    preview.innerHTML = `<p style="text-decoration: ${textDecoration}; font-weight: ${fontWeight};">${newText}</p>`;
  };

  // ^ for copy
  const handelcopyclick = () => {
    let Newtxt = document.getElementById("box");
    Newtxt.select();
    navigator.clipboard.writeText(Newtxt.value);
    props.showAlert("Text Copied", "success");
  };

  // ^ for remove extra space
  const handelremoveextraspacesclick = () => {
    let Newtxt = text.split(/[ ]+/);
    setText(Newtxt.join(" "));
    props.showAlert("Extra Space Removed", "success");
  };
  // ^ for download
  
  const handleDownloadClick = () => {
    const element = document.createElement("a");
    const fileContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TextVibe Editor Output</title>
      <style>
        body {
          font-family: ${fontFamily};
          margin: 20px;
          font-weight: ${isBold ? "bold" : "normal"};
          text-decoration: ${isUnderline ? "underline" : "none"};
        }
        p {
          white-space: pre-wrap;
        }
      </style>
    </head>
    <body>
      <p>${text}</p>
    </body>
    </html>
  `;
    const file = new Blob([fileContent], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "textFile.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // ^ for question mark
  const handelQuestionClick = () => {
    const textarea = document.getElementById("box");
    const textValue = textarea.value;

    const questionMarksIndices = getAllQuestionMarksIndices(textValue);

    if (questionMarksIndices.length > 0) {
      props.showAlert(
        `Found ${questionMarksIndices.length} question mark(s)!`,
        "success"
      );

      textarea.setSelectionRange(0, 0);

      const selectedIndices = questionMarksIndices.filter(
        (index) => index >= 1 && index <= 100000
      );

      selectedIndices.forEach((index) => {
        textarea.setSelectionRange(index, index + 1);
      });

      const newTextValue = textValue.replace(
        /\?/g,
        '<span style="background-color: black; color: white;">?</span>'
      );
      document.getElementById("preview").innerHTML = newTextValue;

      textarea.focus();
    } else {
      props.showAlert("No Question Mark Found", "danger");
    }
  };
  // ^ Function to get all indices of question marks in the text
  const getAllQuestionMarksIndices = (textValue) => {
    const indices = [];
    let index = textValue.indexOf("?");

    while (index !== -1) {
      indices.push(index);
      index = textValue.indexOf("?", index + 1);
    }

    return indices;
  };
  // ^ for speak
  const handleSpeakClick = (event) => {
    let el = event.currentTarget;
    if (el.innerHTML === "Listen Now") el.innerHTML = "Stop Now";
    else el.innerHTML = "Listen Now";

    if (el.innerHTML === "Stop Now") {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.speak(msg);
    } else {
      let msg = new SpeechSynthesisUtterance();
      msg.text = text;
      window.speechSynthesis.cancel(msg);
    }
  };
  // ^ for extract numbers
  const handelextractnumberclick = () => {
    const numbers = text.match(/\d+/g);

    if (numbers) {
      const extractedNumbers = numbers.join(", ");
      setText(extractedNumbers);
      props.showAlert("Numbers Extracted: " + extractedNumbers, "success");
    } else {
      props.showAlert("No Numbers Found", "danger");
    }
    
  };
  // ^ for remove numbers
  const handelremovenumbersclick = () => {
    let Newtxt = text.replace(/\d+/g, "");
    setText(Newtxt);
    props.showAlert("Numbers Removed", "success");
  };

  // ^ for select email
  const handelselectemailclick = () => {
    const textarea = document.getElementById("box");
    const textValue = textarea.value;
    const emails = textValue.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    );

    if (emails) {
      let newTextValue = textValue;
      emails.forEach((email) => {
        newTextValue = newTextValue.replace(
          email,
          `<span style="background-color:#033043; color: white;">${email}</span>`
        );
      });

      document.getElementById("preview").innerHTML = newTextValue;
      props.showAlert(`${emails.length} Email(s) Selected`, "success");
    } else {
      props.showAlert("No Email Address Found", "danger");
    }
  };
  // ^ for select link
  const handelselectlinkclick = () => {
    const textarea = document.getElementById("box");
    const textValue = textarea.value;
    const links = textValue.match(/https?:\/\/[^\s]+/g);

    if (links) {
      let newTextValue = textValue;
      links.forEach((link) => {
        newTextValue = newTextValue.replace(
          link,
          `<span style="background-color: red; color: white;"><a href="${link}" target="_blank">${link}</a></span>`
        );
      });

      document.getElementById("preview").innerHTML = newTextValue;
      props.showAlert(`${links.length} Link(s) Selected`, "success");
    } else {
      props.showAlert("No Links Found", "danger");
    }
  };
  return (
    <>
      <div className={`container rounded bg-co `}>
        <div className="my-3">
          <h5>{props.heading}</h5>
          <h6>
            Text Editor :Word count{" "}
            {text.trim() === "" ? 0 : text.trim().split(/\s+/).length}
            ,Character {text.length},Minutes read{" "}
            {0.08 * text.split(" ").length}
          </h6>

          <textarea
            className={`form-control my-3  `}
            id="box"
            rows="10"
            value={text}
            onChange={handelonchange}
            placeholder="TextVibe : Enter your text here"
            style={{
              fontFamily: fontFamily,
              fontWeight: isBold ? "bold" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
            }}
          ></textarea>
        </div>
        <div className="container   border-dark rounded">
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelonclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Convert to Uppercase</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handellowclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Convert to Lowercase</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelcapclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b> Capitalize</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelremoveextraspacesclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b> Remove Extra spaces</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelcopyclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b> Copy text</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelclearclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b> Clear text </b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={toggleBold}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Bold text</b>
          </button>

          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handleUnderlineClick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>underline text</b>
          </button>

          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handleSpeakClick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b> On Speak </b>
          </button>

          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelextractnumberclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Extract Numbers</b>
          </button>

          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelremovenumbersclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Remove Numbers</b>
          </button>

          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelselectemailclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Select Email</b>
          </button>
          <button
            className="btn mx-1 my-1 border-1-secondary button"
            onClick={handelselectlinkclick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>Select Link</b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handelQuestionClick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <b>find question </b>
          </button>
          <button
            className="btn  mx-1 my-1 border-1-secondary button"
            onClick={handleDownloadClick}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <i class="fa-solid fa-download"> </i>
          </button>
        </div>
        &nbsp;
        <h4>Set Fontfamily</h4>
        <div className="container  my-3  border-dark rounded">
          <select
            id="fontSelect"
            className="form-select my-1"
            onChange={setFontFamilyHandler}
            value={fontFamily}
            style={{ backgroundColor: "#033043", color: "white" }}
          >
            <option className="selected-font-option" value={fontFamily}>
              {fontFamily}
            </option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Courier New, monospace">Courier New</option>
            <option value="Times New Roman, serif">Times New Roman</option>
            <option value="Algerian">Algerian</option>
            <option value="Bahnschrift">Bahnschrift</option>
            <option value="Baskerville Old Face">Baskerville Old Face</option>
            <option value="Batang">Batang</option>
            <option value="BatangChe">BatangChe</option>
            <option value="Bauhaus 93">Bauhaus 93</option>
            <option value="Bell MT">Bell MT</option>
            <option value="Berlin Sans FB">Berlin Sans FB</option>
            <option value="Bernard MT Condensed">Bernard MT Condensed</option>
            <option value="Blackadder ITC">Blackadder ITC</option>
            <option value="Bodoni MT">Bodoni MT</option>
            <option value="Bodoni MT Black">Bodoni MT Black</option>
            <option value="Bodoni MT Condensed">Bodoni MT Condensed</option>
            <option value="Bodoni MT Poster Compressed">
              Bodoni MT Poster Compressed
            </option>
            <option value="Book Antiqua">Book Antiqua</option>
            <option value="Bookman Old Style">Bookman Old Style</option>
            <option value="Bookshelf Symbol 7">Bookshelf Symbol 7</option>
            <option value="Bradley Hand ITC">Bradley Hand ITC</option>
            <option value="Britannic Bold">Britannic Bold</option>
            <option value="Broadway">Broadway</option>
            <option value="Brush Script MT">Brush Script MT</option>
            <option value="Calibri">Calibri</option>
            <option value="Californian FB">Californian FB</option>
            <option value="Calisto MT">Calisto MT</option>
            <option value="Cambria">Cambria</option>
            <option value="Candara">Candara</option>
            <option value="Castellar">Castellar</option>
            <option value="Centaur">Centaur</option>
            <option value="Century">Century</option>
            <option value="Century Gothic">Century Gothic</option>
            <option value="Century Schoolbook">Century Schoolbook</option>
            <option value="Chiller">Chiller</option>
            <option value="Colonna MT">Colonna MT</option>
            <option value="Comic Sans MS">Comic Sans MS</option>
            <option value="Consolas">Consolas</option>
            <option value="Constantia">Constantia</option>
            <option value="Cooper Black">Cooper Black</option>
            <option value="Copperplate Gothic Bold">
              Copperplate Gothic Bold
            </option>
            <option value="Copperplate Gothic Light">
              Copperplate Gothic Light
            </option>
            <option value="Corbel">Corbel</option>
            <option value="Courier New">Courier New</option>
            <option value="Curlz MT">Curlz MT</option>
          </select>
        </div>
        <div className="container my-3   border-dark">
          <h5 className="border-top  border-dark ">Your text Summary</h5>

          <div
            id="preview"
            className="container my-3 border rounded"
            style={{ backgroundColor: "white", color: "black" }}
          >
            Preview
            <p>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}
