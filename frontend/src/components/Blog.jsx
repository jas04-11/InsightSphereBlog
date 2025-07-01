import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ data }) => {
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const navigate = useNavigate();
  return (
    <>
      <div className="card" style={{ width: "18rem"}}>
        <img
          src={`${api_base_url}/uploads/${data.image}`}
          className="card-img-top"
          style={{height:"250px"}}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{data.title.length > 20
              ? data.title.substr(0, 20) + "..."
              : data.title}</h5>
          <p className="card-text">
            {data.desc.length > 60
              ? data.desc.substr(0, 60) + "..."
              : data.desc}
          </p>
          <a
            onClick={() => {
              navigate(`/blog/${data._id}`);
            }}
            className="btn btnNormal"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default Blog;
