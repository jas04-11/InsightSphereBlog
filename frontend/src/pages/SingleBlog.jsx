/*import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  let { blogId } = useParams();
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const getBlog = () => {
    fetch(`${api_base_url}/getBlog`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blog);
          setImage(data.blog.image);
        } else {
          alert(data.msg);
        }
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">{data ? data.title : ""}</h1>
        <p lead mb-4>
          Created : {data ? new Date(data.date).toDateString() : ""}
        </p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{data ? data.desc : ""}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
          <Link to="/"><button
              type="button "
              className="btn btnNormal btn-lg px-4 me-sm-3"
            >
              Go Back
            </button></Link>
            </div>
        </div>
        <div className="" style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src={`${api_base_url}/uploads/${image}`}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div>{data ? parse(data.content) : ""}</div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
//*********************************** 
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  let { blogId } = useParams();
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const getBlog = () => {
    fetch(`${api_base_url}/getBlog`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blog);
          setImage(data.blog.image);
        } else {
          alert(data.msg);
        }
      });
  };

  const likeBlog = () => {
    fetch(`${api_base_url}/likeBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        blogId: blogId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData((prev) => ({ ...prev, likes: data.likes }));
        }
      });
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <h1 className="display-4 fw-bold">{data ? data.title : ""}</h1>
        <p>
          Created: {data ? new Date(data.date).toDateString() : ""}
        </p>
        <p>
          <strong>Views:</strong> {data?.views || 0} |{" "}
          <strong>Likes:</strong> {data?.likes || 0}
        </p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{data ? data.desc : ""}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <Link to="/">
              <button
                type="button"
                className="btn btnNormal btn-lg px-4 me-sm-3"
              >
                Go Back
              </button>
            </Link>
            <button onClick={likeBlog} className="btn btnNormal btn-lg px-4">
              ❤️ Like ({data?.likes || 0})
            </button>
          </div>
        </div>
        <div style={{ maxHeight: "30vh" }}>
          <div className="container px-5">
            <img
              src={`${api_base_url}/uploads/${image}`}
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
          <div>{data ? parse(data.content) : ""}</div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;


*/
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import parse from "html-react-parser";

const SingleBlog = () => {
  const [data, setData] = useState(null);
  const [image, setImage] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
const [isSaved, setIsSaved] = useState(null);

  let { blogId } = useParams();
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const getBlog = () => {
    fetch(`${api_base_url}/getBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blogId: blogId,
        token: localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData(data.blog);
          setImage(data.blog.image);
          setComments(data.blog.comments || []);
          const blogIdStr = data.blog._id.toString();
    const savedIds = data.savedBlogs.map(id => id.toString());
    setIsSaved(savedIds.includes(blogIdStr)); // ✅ compare properly
     } else {
          alert(data.msg);
        }
      });
  };

  const likeBlog = () => {
    fetch(`${api_base_url}/likeBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        blogId: blogId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setData((prev) => ({ ...prev, likes: data.likes }));
        }
      });
  };

  const submitComment = () => {
    if (!comment.trim()) return;

    fetch(`${api_base_url}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        blogId: blogId,
        text: comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setComments(data.comments);
          setComment("");
        }
      });
  };
  const readAloud = () => {
    if (window.speechSynthesis.speaking) {
      // Stop if already speaking
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!data?.content) return;

    const utterance = new SpeechSynthesisUtterance();
    const plainText = `${data.title}. ${data.desc}. ${
      document.getElementById("blog-content")?.innerText
    }`;

    utterance.text = plainText;
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      setIsSpeaking(false); // reset after speech ends
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const toggleSave = () => {
    fetch(`${api_base_url}/toggleSaveBlog`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        blogId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
        setIsSaved(data.saved);
        }
      });
  };


  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <Navbar />

      <div className="px-4 pt-5 my-5 text-center border-bottom">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "5px",
            marginTop: "0",
          }}
        ></div>

        <h1 className="display-4 fw-bold">{data ? data.title : ""}</h1>
        <p>Created: {data ? new Date(data.date).toDateString() : ""}</p>
        <p>
          <strong>Views:</strong> {data?.views || 0} | <strong>Likes:</strong>{" "}
          {data?.likes || 0}
        </p>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">{data ? data.desc : ""}</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button onClick={likeBlog} className="btn btnNormal btn-lg px-4">
              ❤️ ({data?.likes || 0})
            </button>
            <button onClick={readAloud} className="btn btnNormal btn-lg px-4">
              {isSpeaking ? "🔊" : "🔇"}
            </button>
            <button onClick={toggleSave} className="btn btnWhite btn-lg px-4">
  {isSaved ? "Remove from Saved" : "🔖 Save for Later"}
</button>

          </div>
        </div>

        {/*image */}
        <div className="container px-5 mt-4">
          <img
            src={`${api_base_url}/uploads/${image}`}
            className="img-fluid border rounded-3 shadow-lg mb-4"
            alt="Blog"
            width="700"
            height="500"
            loading="lazy"
          />
          {/* BLOG CONTENT */}

          <div className="mb-5 text-start">
            {data ? parse(data.content) : ""}
          </div>

          {/* 💬 Comments Section */}
          <h4>Comments</h4>
          <div>
            <textarea
              className="form-control mb-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
            />
            <button onClick={submitComment} className="btn btnNormal mb-4">
              Submit Comment
            </button>
          </div>

          {comments.length > 0 ? (
            comments.map((cmt, i) => (
              <div
                key={i}
                className="mb-3 p-3 border rounded text-start bg-light"
              >
                <strong style={{ color: "#222" }}>{cmt.name}</strong>
                <p className="mb-1" style={{ color: "#222" }}>
                  {cmt.text}
                </p>
                <small className="text-muted">
                  {new Date(cmt.createdAt).toLocaleString()}
                </small>
              </div>
            ))
          ) : (
            <p className="text-muted">No comments yet.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
