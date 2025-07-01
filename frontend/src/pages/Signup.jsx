import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Access environment variable from
  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const submitForm = (e) => {
    e.preventDefault();

    // Form submission
    fetch(`${api_base_url}/signup`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        name: name,
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/login");
        } else {
          setError(data.msg);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setError("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="signin container px-5" style={{ marginTop: "60px" }}>
      <form onSubmit={submitForm}>
        <h1
          className="h3 mb-3 fw-normal floating-input"
          style={{ color: "#0317f9", fontSize: "40px" }}
        >
          SignUp
        </h1>
        <div className="form-floating floating-input">
          <input
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="username"
            required
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating floating-input">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="name"
            required
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating floating-input">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            className="form-control"
            id="floatingEmail"
            placeholder="name@example.com"
            required
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating floating-input">
          <input
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            required
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <p className="floating-input">
          Already have an account? <Link to="/login">Login</Link>
        </p>

        {/* Display error message */}
        {error && (
          <p className="floating-input" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button className="btnNormal floating-input" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
