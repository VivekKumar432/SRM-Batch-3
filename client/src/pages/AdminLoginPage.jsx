import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/CSS/adminLoginPage.css'; // Import the CSS file

function AdminLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(
              "http://localhost:5050/api/admin/login",
              {
                email,
                password,
              },
              { withCredentials: true, credentials: "include" }
            );
      
            if (response.status === 200) {
              navigate("/admin-home"); // Redirect to main page or dashboard
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
            console.log("Error during login", error);
          }
        };
    
    return (
        <div className="admin-login-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoCapitalize="off"
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
                            autoCapitalize="off"
                            name="password"
                            className="form-control rounded-7"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-7 bg-primary">
                        Login
                    </button>
                </form>
                <br />
                <p>Dont have an Admin Account?</p>
                <Link to="/admin/signup" className="btn btn-default border w-100 bg-light rounded-7 text-decoration-none">
                   Sign Up as Admin
                </Link>
            </div>
    )
}

export default AdminLoginPage;
