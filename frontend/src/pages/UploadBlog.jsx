import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import JoditEditor from "jodit-react";

const UploadBlog = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
  const admin_secret = import.meta.env.VITE_ADMIN_SECRET;
  const checkAdmin = () => {
    if (adminSecret !== "") {
      if (adminSecret === "admin1234") {
        setIsAdmin(true);
      } else {
        setError("Invalid admin secret !");
      }
    } else {
      setError("Please provide admin secret !");
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("token", localStorage.getItem("token"));

    fetch(`${api_base_url}/uploadBlog`, {
      mode: "cors",
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Blog created successfully");
          setTitle("");
          setDesc("");
          setContent("");
          setImage("");
          setError("");
        } else {
          setError(data.msg);
        }
      });
  };

  return (
    <>
      {isAdmin == false ? (
        <>
          <div className="signin container px-5" style={{ marginTop: "60px" }}>
            <div>
              <h4
                className="floating-input"
                style={{ color: "#0317f9", fontSize: "30px" }}
              >
                Login to Upload Blog - Admin Panel
              </h4>
              <div className="form-floating floating-input">
                <input
                  onChange={(e) => {
                    setAdminSecret(e.target.value);
                  }}
                  value={adminSecret}
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="admin"
                  required
                />
                <label htmlFor="floatingInput">Enter Admin Secret</label>
              </div>
              <p className="floating-input" style={{ color: "red" }}>
                {error}{" "}
              </p>

              <button
                className="btnNormal floating-input"
                onClick={() => {
                  checkAdmin();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <form
            onSubmit={submitForm}
            className=" container px-5"
            style={{ marginTop: "60px" }}
          >
            <h4
              className="floating-input"
              style={{ color: "#0317f9", fontSize: "30px" }}
            >
              Upload Blog
            </h4>

            <div className="form-floating floating-input">
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Enter Title"
                required
              />
              <label htmlFor="floatingInput">Enter Title</label>
            </div>
            <div className="form-floating floating-input">
              <textarea
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                value={desc}
                className="form-control"
                id="floatingTextArea"
                placeholder="Enter Description"
                required
              ></textarea>
              <label htmlFor="floatingDesc">Enter Description</label>
            </div>
            <JoditEditor
              ref={editor}
              className="text-black mt-2"
              value={content}
              tabIndex={1} // tabIndex of textarea
              onChange={(newContent) => setContent(newContent)}
            />

            <div className="form-floating floating-input">
              <input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type="file"
                className="form-control"
                id="floatingFile"
                placeholder=""
                required
              />
              <label htmlFor="floatingFile">Upload Image</label>
            </div>
            <button className="btnNormal floating-input">Create Blog</button>
          </form>
        </>
      )}
    </>
  );
};

export default UploadBlog;
