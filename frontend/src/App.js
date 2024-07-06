import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';

function App() {
  const [userRole, setUserRole] = React.useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-home" element={userRole === 'user' ? <UserHome /> : <Home />} />
        <Route path="/admin-home" element={userRole === 'admin' ? <AdminHome /> : <Home />} />
      </Routes>
    </Router>
  );
}

export default App;
