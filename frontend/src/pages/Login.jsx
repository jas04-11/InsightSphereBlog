import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState("");

  const api_base_url =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

  const submitForm = (e) => {
    e.preventDefault();
    fetch(`${api_base_url}/login`, {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          setTimeout(() => {
            window.location.href = "/";
          }, 200);
        } else {
          setError(data.msg);
        }
      });
  };
  return (
    <div className="signin container px-5" style={{ marginTop: "60px" }}>
      <form onSubmit={submitForm}>
        <h1
          className="h3 mb-3 fw-normal floating-input"
          style={{ color: "#0317f9", fontSize: "40px" }}
        >
          Login
        </h1>

        <div className="form-floating floating-input">
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            onChange={(e) => {
              setPwd(e.target.value);
            }}
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
          Not have an account? <Link to="/signup">Signup</Link>
        </p>
        <p className="floating-input" style={{ color: "red" }}>
          {error}{" "}
        </p>

        <button className="btnNormal floating-input" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
