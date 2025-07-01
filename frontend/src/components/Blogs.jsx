import Blog from "./Blog";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const [data, setData] = useState(null);
  const getBlogs = () => {
    fetch(`${api_base_url}/getBlogs`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blogs);
        } else {
          alert(data.msg);
        }
      });
  };
  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <>
      <div className="blogs mt-5 mb-5" id="blog">
        <h3 className="latest">
          Latest <span className="sp-text">Blogs</span>
        </h3>
        <div className="blogsCon">
          {data
            ? data.map((item, index) => {
                return (
                  <>
                    <Blog key={index} data={item} />
                  </>
                );
              })
            : "No Blogs Found !"}
        </div>
      </div>
    </>
  );
};

export default Blogs;
