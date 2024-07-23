import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import AdminHomePage from "./pages/AdminHomePage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminSignupPage from "./pages/AdminSignupPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/admin/signup" element={<AdminSignupPage />}></Route>
        <Route path="/admin/login" element={<AdminLoginPage />}></Route>
        <Route path="/user-home" element={<UserHomePage />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
