import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    role: 'user', // default role
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, role: checked ? 'admin' : 'user' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/register', formData);
      alert('User registered successfully');
      navigate('/');  
    } catch (error) {
      alert('Error registering user: ' + error.response.data);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="role-container">
          <label>
            <input
              type="checkbox"
              name="role"
              value="admin"
              checked={formData.role === 'admin'}
              onChange={handleChange}
            />
            Admin
          </label>
          <label>
            <input
              type="checkbox"
              name="role"
              value="user"
              checked={formData.role === 'user'}
              onChange={handleChange}
            />
            User
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
