import React from "react";

export default function TextVibeAbout() {
  return (
    <div className={`container `}>
      <h1 className="my-3">About us</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className={`accordion-item `}>
          <h2 className={`accordion-header `}>
            <button
              className={`accordion-button collapsed `}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              About text editor
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              1. Convert Text: It allows you to convert the text to uppercase,
              lowercase, or capitalize the first letter of each word.
              <br />
              2. Remove Extra Spaces: Removes extra spaces between words.
              <br />
              3. Copy Text: Copies the text to the clipboard.
              <br />
              4. Clear Text: Clears the text area.
              <br />
              5. Set Font Family: Allows you to select different font families
              for the text.
              <br />
              6. Extract Numbers: Extracts numbers from the text.
              <br />
              7. Remove Numbers: Removes numbers from the text.
              <br />
              8. Select Email: Highlights email addresses in the text.
              <br />
              9. Select Link: Highlights web links in the text.
              <br />
              10. Find Question Marks: Highlights question marks in the text.
              <br />
              11. Text Preview: Displays a preview of the formatted text.
              <br />
              12. Download Text: Downloads the text as an HTML file with the
              selected font family applied.
              <br />
              13. Text Speak: Allows the text to be spoken using the browser's
              speech synthesis API.
              <br />
            </div>
          </div>
        </div>
        <div className={`accordion-item `}>
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              Team Members
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <h5>Ayush jagota </h5>
              <h5>Thakur Abhay singh</h5>
              <h5>Vijay prakash singh mehta</h5>
              <h5>Shivanshu garg</h5>
            </div>
          </div>
        </div>
        <div className={`accordion-item `}>
          {" "}
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              Accordion Item #3
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Placeholder content for this accordion, which is intended to
              demonstrate the <code>.accordion-flush</code> class. This is the
              third item's accordion body. Nothing more exciting happening here
              in terms of content, but just filling up the space to make it
              look, at least at first glance, a bit more representative of how
              this would look in a real-world application.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}