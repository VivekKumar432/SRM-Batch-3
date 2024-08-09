import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/CSS/adminSignupPage.css';

function AdminSignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!name || !email || !password) {
          setError("Fields cannot be empty");
          return;
        }
    
        try {
          const response = await axios.post(
            "http://localhost:5050/api/user/admin/login",
            {
              name,
              email,
              password,
            },
            { withCredentials: true, credentials: "include" }
          );
    
          if (response.status === 201) {
            navigate("admin//login"); // Redirect to main page or dashboard
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
        <div className="admin-signup-container">
                <h2>Admin Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="bg-light form-control rounded-7"
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-7"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-7"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-7 bg-primary">
                        Register
                    </button>
                </form>
                <p>Already Have an Account</p>
                <Link to="/admin/login" className="mb-3 btn btn-default border w-100 rounded-7 text-decoration-none bg-light">
                    Admin Login
                </Link>
                <Link to="/register" className="btn btn-default border w-100 rounded-7 text-decoration-none bg-light">
                    Employee registration
                </Link>
            </div>
    );
}

export default AdminSignupPage;
