import { useContext, useEffect, useState } from "react";
import Sidebar from "../component/sidebar";

import { useNavigate } from "react-router";
import { Context } from "../context/context";
import Vediocard from "../component/vediocard";
import MobileSidebar from "../component/mobilesidebar";

const Home = () => {
  let navigate = useNavigate();
  let { getaccount } = useContext(Context);
  let [videos, setvideos] = useState([]);
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
          return navigate("/login");
        }
        getaccount();
        setvideos(value);
      });
  }, []);
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
          return navigate("/login");
        } else {
          return navigate("/");
        }
      });
  }, []);
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className=" hidden md:block md:ml-56 pt-16 px-4">
        <div
          className="
            grid gap-5
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {videos?.map((video, index) => (
            <Vediocard video={video} />
          ))}
        </div>
      </div>

      <div className="w-full  flex flex-col gap-2  md:hidden ">
        {videos.map((video, index) => (
          <Vediocard video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
