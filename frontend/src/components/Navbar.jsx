/*import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="navlink navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className=" navItem navbar-brand main" href="/">
          InsightSphere
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="navItem nav-link " href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="navItem nav-link" href="#blog">
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="navItem nav-link "
                  href="/uploadBlog"
                  tabIndex="-1"
                >
                  Upload Blog
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("isLoggedIn");
                  navigate("/login");
                }}
                className="btn navItem"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>

      </>
  );
};

export default Navbar;*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  // Get saved mode from localStorage or default to 'light'
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-mode" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme handler
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <nav className="navlink navbar navbar-expand-lg navbar-light sticky-top">
        <div className="container-fluid">
          <a className=" navItem navbar-brand main" href="/">
            InsightSphere
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="navItem nav-link " href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="navItem nav-link" href="#blog">
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="navItem nav-link "
                  href="/uploadBlog"
                  tabIndex="-1"
                >
                  Upload Blog
                </a>
              </li>
              <li className="nav-item">
  <a className="navItem nav-link" href="/saved">
    Saved Blogs
  </a>
</li>

            </ul>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="btn btn-outline-light me-3"
              aria-label="Toggle dark/light mode"
              style={{ fontSize: "1.2rem" }}
              type="button"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>

            <form className="d-flex">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("isLoggedIn");
                  navigate("/login");
                }}
                className="btn navItem"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;


