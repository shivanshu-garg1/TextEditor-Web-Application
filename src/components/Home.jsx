import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "../cssFiles/Home.css";
import img1 from "../Images/im.png";

export default function Home() {
  const { user } = useAuth0();

  return (
    <div>
      <header className="header" style={{ padding: "30px" }}>
        <div className="left-section">
          <h2>Hello {user ? user.name : "user"}</h2>
          <h3 className="welcome-text">
            Welcome to TEXT editor web application
          </h3>
        </div>
        <div className="right-section">
          <img src={img1} alt="" />
        </div>
      </header>
      
      <footer className="footer">
        <div className="first-section">
          <h1>Text Editor</h1>
        </div>
        <div className="sec-section">
          <h3>Contact us</h3>
          <p>
            Ayush jagota : ayush1@gmail.com <br />
            Thakur Abhay singh : abhay2@gmail.com
            <br />
            Vijay prakash singh mehta : nakulvps3@gmail.com
            <br />
            Shivanshu garg : shivanshu4@gmail.com
          </p>
          <h4><a  className="link" href="https://forms.gle/3q9Tc3jWY8xYQ9oM7" rel="noreferrer" target="_blank">Feedback</a></h4>
        </div>
      </footer>
    </div>
  );
}
