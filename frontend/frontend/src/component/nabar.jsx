//////
import { useState, useRef, useEffect, useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import { Context } from "../context/context";
export default function Navbar() {
  let { account, getaccount, setsearchdeta, setOpensidebar } =
    useContext(Context);

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  let logout = () => {
    fetch("http://localhost:4000/api/auth/logout", {
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
        if (value.ok) {
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
          getaccount();
          navigate("/login");
        }
      });
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-black z-50 border-b border-zinc-800">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-2.5 text-white">
          <FaBars
            className="block text-white  md:hidden"
            onClick={() => {
              setOpensidebar(true);
            }}
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube"
            className="h-5"
          />
        </div>

        <div className="flex flex-1 justify-center">
          <input
            className="w-1/2 bg-zinc-900 text-white px-4 py-1 rounded-l-full outline-none"
            placeholder="Search"
            onChange={(e) => {
              setsearchdeta(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                navigate("/search");
              }
            }}
          />
          <button className="bg-zinc-800 px-4 rounded-r-full text-white">
            <CiSearch />
          </button>
        </div>

        {account.image && (
          <div className="relative" ref={popupRef}>
            <button onClick={() => setOpen(!open)}>
              {account ? (
                <img
                  src={account?.image}
                  className="w-8 h-8 rounded-full"
                  alt="profile"
                />
              ) : (
                ""
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-56 bg-zinc-900 text-white rounded-xl shadow-lg border border-zinc-800">
                <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
                  <img
                    src={account?.image}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-semibold">{account?.name}</p>
                    <p className="text-xs text-gray-400">View your channel</p>
                  </div>
                </div>

                <ul className="text-sm py-2">
                  <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
                    Your channel
                  </li>
                  <li className="px-4 py-2 hover:bg-zinc-800 cursor-pointer">
                    YouTube Studio
                  </li>
                  <li className="border-t border-zinc-800 my-1"></li>
                  <li
                    className="px-4 py-2 text-red-500 hover:bg-red-600 hover:text-white cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
