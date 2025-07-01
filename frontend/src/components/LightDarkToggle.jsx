import React, { useEffect, useState } from "react";

const LightDarkToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // On mount, check localStorage and set initial mode
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.classList.toggle("dark-mode", savedMode);
    document.body.classList.toggle("light-mode", !savedMode);
  }, []);

  const toggleMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      document.body.classList.toggle("light-mode", !newMode);
      return newMode;
    });
  };

  return (
    <button onClick={toggleMode} className="toggle-btn">
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
};

export default LightDarkToggle;
