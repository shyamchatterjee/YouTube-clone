import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export let Context = createContext(null);

export let ContextFunction = ({ children }) => {
  let [account, setaccount] = useState({});
  let navigate = useNavigate();
  let [loading, setloading] = useState(false);
  let [searchdeta, setsearchdeta] = useState("");
  let [sidebaropen, setOpensidebar] = useState(false);
  let [deta, setdeta] = useState([]);

  let getaccount = () => {
    fetch("http://localhost:4000/api/auth/acount", {
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
        return setaccount(value?.user);
      });
  };

  useEffect(() => {
    getaccount();
  }, []);
  let getsearchdeta = () => {
    fetch("http://localhost:4000/api/youtube/search?q=" + searchdeta, {
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
        setdeta(value);
      });
  };
  const savehistory = (video) => {
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history = history.filter((item) => item?.id !== video?.id);

    history.unshift({
      ...video,
      watchedAt: new Date().toISOString(),
    });

    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <Context.Provider
      value={{
        account,
        setaccount,
        getaccount,
        loading,
        setloading,
        setsearchdeta,
        searchdeta,
        getsearchdeta,
        deta,
        sidebaropen,
        setOpensidebar,
        savehistory,
      }}
    >
      {children}
    </Context.Provider>
  );
};
