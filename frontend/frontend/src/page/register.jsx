import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { Context } from "../context/context";

const Register = () => {
  let [obj, setobj] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });
  let [msg, setmsg] = useState("");
  let { loading, setloading } = useContext(Context);
  let navigate = useNavigate();

  let register = (e) => {
    e.preventDefault();
    setloading(true);
    fetch("http://localhost:4000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(obj),
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        setloading(true);
        setTimeout(() => {
          setloading(false);
          if (!value.ok) {
            return setmsg(value.message);
          }
          toast.success(value.message + "✅", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          return navigate("/");
        }, 2000);
      });
  };
  useEffect(() => {
    fetch("http://localhost:4000/api/youtube/getdeta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (value.message === "You are not login, Please login") {
          return navigate("/register");
        } else {
          return navigate("/");
        }
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <div className="flex justify-center mb-6">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="h-6"
          />
        </div>

        <h2 className="text-white text-xl font-medium text-center">Sign in</h2>
        <p className="text-zinc-400 text-sm text-center mt-1">
          to continue to YouTube
        </p>

        <form className="mt-6 space-y-4" onSubmit={register}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-3 bg-black text-white border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setobj({ ...obj, name: e.target.value });
            }}
          />

          <input
            type="text"
            placeholder="Image"
            className="w-full px-4 py-3 bg-black text-white border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setobj({ ...obj, image: e.target.value });
            }}
          />

          <input
            type="email"
            placeholder="Email or phone"
            className="w-full px-4 py-3 bg-black text-white border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setobj({ ...obj, email: e.target.value });
            }}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-black text-white border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500"
            onChange={(e) => {
              setobj({ ...obj, password: e.target.value });
            }}
          />
          {msg ? <p className="text-red-600 text-center">{msg}</p> : ""}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-0.5 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-full font-medium"
          >
            {loading ? <div className="loading"></div> : ""}
            Sign up
          </button>
        </form>

        <div className=" w-full flex justify-center items-center gap-0.5 text-sm mt-5 ">
          <p>You're allredy create a account?</p>
          <button className="text-blue-600">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
