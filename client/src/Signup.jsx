import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Signup.css'; // Make sure this path is correct

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/register', { name, email, password })
        .then(result => {
            console.log(result.data);
            navigate('/login');
        })
        .catch(err => console.log(err));
};
  
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
       <div className="emoji-container">
          <span role="img" aria-label="User" className="user-emoji">👤</span>
      </div>
      
      <form className="signup-form" onSubmit={handleSubmit}>
      <div className="mb-3">
          <label>
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
        
        
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <br />
      <p>Already have an account? <Link to="/login" className="login-link">Log in</Link></p>
      
      <div className="custom-links-container">
            <Link to="/admin" className="btn-custom">
                Admin registration
            </Link>
            <Link to="/admin/login" className="btn-custom">
                Admin login
            </Link>
        </div>
      
        


    </div>
  );
}

export default Signup;
