import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Blog from "../components/Blog"; // assuming same component used in Blogs.jsx

const SavedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  useEffect(() => {
    fetch(`${api_base_url}/getSavedBlogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          alert(data.msg);
        }
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="blogs mt-5 mb-5">
        <h3 className="latest">
          My <span className="sp-text">Saved Blogs</span>
        </h3>
        <div className="blogsCon">
          {blogs.length > 0 ? (
            blogs.map((blog, index) => <Blog key={index} data={blog} />)
          ) : (
            <p className="text-muted px-4">You haven’t saved any blogs yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SavedBlogs;
