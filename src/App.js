import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./components/About";
import Editor from "./components/Editor";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import Goals from "./components/Goals";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <Router>
      <Navbar title="Text Editor" about="About Text Editor">
        {" "}
      </Navbar>
      <Alert alert={alert} />
      <div className="co">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/goals" element={<Goals />} />
          
          <Route
            path="/editor"
            element={
              <Editor
                heading="Text Editor: Enter Text to Analyze Below"
                showAlert={showAlert}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
