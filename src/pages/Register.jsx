import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../layouts/Auth";
import { Info, KeyRound, Lock, User } from "lucide-react";
import axiosInstance from "../utils/axiosConfig";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");

  const navigate = useNavigate();

  const submitted = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post("/register", {
      username: username,
      password: password,
      password_confirmation: confirmPassword,
    });
    if (response.data.error) {
      setErrorMesssage(response.data.error);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      return;
    }
    if (response.data.username) {
      navigate("/login");
    }
  };

  return (
    <Auth title="Register">
      <form
        onSubmit={submitted}
        method="POST"
        className="flex flex-col w-1/2 gap-4 "
      >
        <div className="relative">
          {errorMessage.username && (
            <Info className="absolute right-2 top-2 text-red-400" />
          )}
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            autoComplete="off"
            className={`pl-11 w-full bg-slate-800 border-slate-400 border-[1px]  text-white rounded-md p-2 hover:outline hover:outline-2 hover:outline-slate-400 focus:ring-4 focus:ring-blue-300  focus:outline-blue-600 focus:outline-[1px] shadow-inner ${
              errorMessage.username ? "outline outline-1 outline-red-400" : ""
            }`}
          />
          <User className="top-2 left-2 absolute text-slate-400" />
          {errorMessage.username && (
            <span className="text-red-400">{errorMessage.username}</span>
          )}
        </div>
        <div className="relative">
          {errorMessage.password && (
            <Info className="absolute right-2 top-2 text-red-400" />
          )}
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`pl-11 w-full bg-slate-800 border-slate-400 border-[1px]  text-white rounded-md p-2 hover:outline hover:outline-2 hover:outline-slate-400 focus:ring-4 focus:ring-blue-300  focus:outline-blue-600 focus:outline-[1px] shadow-inner ${
              errorMessage.password ? "outline outline-1 outline-red-400" : ""
            }`}
          />
          <KeyRound className="top-2 left-2 absolute text-slate-400" />
        </div>
        <div className="relative">
          {errorMessage.password && (
            <Info className="absolute right-2 top-2 text-red-400" />
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirm_password"
            name="confirm_password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`pl-11 w-full bg-slate-800 border-slate-400 border-[1px]  text-white rounded-md p-2 hover:outline hover:outline-2 hover:outline-slate-400 focus:ring-4 focus:ring-blue-300  focus:outline-blue-600 focus:outline-[1px] shadow-inner ${
              errorMessage.password ? "outline outline-1 outline-red-400" : ""
            }`}
          />
          <Lock className="top-2 left-2 absolute text-slate-400" />
          {errorMessage.password && (
            <span className="text-red-400">{errorMessage.password}</span>
          )}
        </div>
        <button
          type="submit"
          className="rounded-full font-semibold bg-blue-800 transition-all p-2 text-white hover:bg-white hover:outline-black hover:outline-1 hover:outline hover:text-black "
        >
          SUBMIT
        </button>
      </form>
      <div className="text-white">
        <span>
          Already have an account?{" "}
          <Link
            className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
            to="/login"
          >
            Log in
          </Link>
        </span>
      </div>
    </Auth>
  );
}

export default Register;
