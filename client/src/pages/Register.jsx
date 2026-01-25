import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, user, error, message, loading } = useSelector(
    (state) => state.auth,
  );
  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    dispatch(register(data));
  };
  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verify/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, loading, isAuthenticated]);
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        {/* LEFT SIDE */}
      <div
        className="hidden w-full md:w-1/2 bg-black text-white 
      md:flex flex-col items-center justify-center p-8 
      rounded-tr-[80px] rounded-br-[80px] "
      >
        <div className="text-center h-[375px]">
          <div className="flex justify-center mb-12">
            <img
              src={logo_with_title}
              alt="Logo"
              className="mb-12 h-44 w-auto"
            />
          </div>
          <p className="text-gray-300 mb-12">
            {" "}
            Already Have An Account? Sign in now.{" "}
          </p>
          <Link
            to={"/login"}
            className="border-2 rounded-lg 
          py-2 font-semibold border-white px-8 hover:bg-white 
          hover:text-black transition "
          >
            SIGN IN
          </Link>
        </div>
      </div>
      {/* RIGHT SIDE */}
      </div>
      
      
    </>
  );
};

export default Register;
