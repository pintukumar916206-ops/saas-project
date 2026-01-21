import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LOGIN from "./pages/LOGIN";
import REGISTER from "./pages/REGISTER";
import ForgotPassword from "./pages/ForgotPassword";
import OTP from "./pages/OTP";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LOGIN />} />
        <Route path="/register" element={<REGISTER />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verify/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;
