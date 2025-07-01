import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Nopage from "./pages/Nopage";
import SingleBlog from "./pages/SingleBlog";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UploadBlog from "./pages/UploadBlog";
import LightDarkToggle from "./components/LightDarkToggle";
import SavedBlogs from "./pages/SavedBlogs";

function App() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
  path="/saved"
  element={
    isLoggedIn ? <SavedBlogs /> : <Navigate to={"/login"} />
  }
/>

          <Route
            path="/uploadBlog"
            element={isLoggedIn ? <UploadBlog /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/blog/:blogId"
            element={isLoggedIn ? <SingleBlog /> : <Navigate to={"/login"} />}
          />
          <Route path="*" element={<Nopage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
