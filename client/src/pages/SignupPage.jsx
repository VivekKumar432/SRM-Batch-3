import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/CSS/signupPage.css"; // Make sure this path is correct

function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !userName || !email || !password) {
      setError("Fields cannot be empty");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5050/api/user/register",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true, credentials: "include" }
      );

      if (response.status === 201) {
        navigate("/login"); // Redirect to main page or dashboard
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "Login failed. Please try again."
        );
      } else if (error.request) {
        setError(
          "No response from server. Please check your network connection."
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.log("Error during signup", error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Signup Form</h1>
      <div className="emoji-container">
        <span role="img" aria-label="User" className="user-emoji">
          👤
        </span>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="First Name"
            autoComplete="off"
            name="firstName"
            className="bg-light form-control rounded-7"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Last Name"
            autoComplete="off"
            name="lastName"
            className="bg-light form-control rounded-7"
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            placeholder="User Name"
            autoComplete="off"
            name="userName"
            className="bg-light form-control rounded-7"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            className="form-control rounded-7"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            className="form-control rounded-7"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="error_msg">{error}</div>}
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
      <br />
      <p>
        Already have an account?{" "}
        <Link to="/login" className="login-link">
          Log in
        </Link>
      </p>

      <div className="custom-links-container">
        <Link to="/admin/signup" className="btn-custom">
          Admin registration
        </Link>
        <Link to="/admin/login" className="btn-custom">
          Admin login
        </Link>
      </div>
    </div>
  );
}

export default SignupPage;
