import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState('');

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUserRole={setUserRole} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-home" element={userRole === 'user' ? <UserHome /> : <Navigate to="/" />} />
          <Route path="/admin-home" element={userRole === 'admin' ? <AdminHome /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
