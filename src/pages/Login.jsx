import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../layouts/Auth";
import axiosInstance from "../utils/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { KeyRound, User } from "lucide-react";
function Login() {
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMesssage] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitted = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Authenticating...");
    await axiosInstance
      .post("/login", {
        username: username,
        password: password,
      })
      .then(({ data }) => {
        const auth = {
          username: data.username,
          user_id: data.user_id,
        };
        if (data) {
          sessionStorage.setItem("data", JSON.stringify(auth));
          toast.remove(toastId);
          toast.success("Berhasil login");
          setTimeout(() => {
            navigate("/room");
          }, [2500]);

          return;
        }
        data.error && setErrorMesssage(data.error);
      })
      .catch(({ response }) => {
        toast.remove(toastId);
        toast.error("Invalid Data");
        setErrorMesssage(response.data.error);
        if (response.data.error.password) {
          setPassword("");
          return;
        }
        setUsername("");
        return;
      });
  };

  return (
    <Auth title={"Log in"}>
      <Toaster />
      <span className="text-white">Login your account to save the message</span>
      <form
        onSubmit={submitted}
        method="POST"
        className="flex flex-col w-1/2 gap-4 "
      >
        <div className="flex flex-col relative">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            autoComplete="off"
            value={username}
            className="pl-11 bg-slate-800 outline-slate-400 outline-1 outline text-white  rounded-md p-2 hover:outline hover:outline-2 focus:ring-4 focus:ring-blue-300  focus:outline-blue-600 focus:outline-[1px] shadow-inner"
          />
          <User className="top-2 left-2 absolute text-slate-400" />
          {errorMessage.username && (
            <span className="text-red-600">{errorMessage.username}</span>
          )}
        </div>
        <div className="flex flex-col relative">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="pl-11 bg-slate-800 outline-slate-400 outline-1 outline font-serif placeholder:font-Urbanist text-white rounded-md p-2 hover:outline hover:outline-2 focus:ring-4 focus:ring-blue-300  focus:outline-blue-600 shadow-inner"
          />
          <KeyRound className="top-2 left-2 absolute text-slate-400" />
          {errorMessage && (
            <span className="text-red-600">{errorMessage.password}</span>
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
          Don&apos;t have an account?{" "}
          <Link
            className="text-blue-600 font-semibold hover:text-blue-800 hover:underline"
            to="/"
          >
            Register
          </Link>
        </span>
      </div>
    </Auth>
  );
}

export default Login;
