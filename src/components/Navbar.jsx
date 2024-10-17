import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../cssFiles/navcss.css";
import Home from "./Home";
export default function Navbar(props) {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log("current user", user);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar back navbar my-6 border-bottom shadow-lg p-3 mb-3`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/editor">
            <h5 className="b">{props.title}</h5>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  <h5 className="b">Home</h5>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  <h5 className="b">{props.about}</h5>
                </Link>
              </li>
              {/* <li className="nav-item">
                
              </li> */}
               <li className="nav-item">
                <Link className="nav-link active" to="/goals">
                  <h5 className="b">Goals</h5>
                </Link>
              </li>
            </ul>
            <div className={`form-check form-switch `}>
              {isAuthenticated ? (
                <h4>
                  {isAuthenticated && (
                    <h4 style={{ color: "white" }}>
                      {" "}
                      {user.given_name}{" "}
                      <button
                        className="bb fa-solid fa-arrow-right-from-bracket"
                        style={{ borderRadius: "10px" }}
                        onClick={(e) => logout()}
                      ></button>
                    </h4>
                  )}
                </h4>
              ) : (
                <button
                  className="bb"
                  onClick={(e) => loginWithRedirect()}
                  style={{ borderRadius: "10px" }}
                >
                  <h4>Login</h4>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: "Enter title here",
  about: "About",
};
