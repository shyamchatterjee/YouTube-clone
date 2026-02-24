import { Link } from "react-router";
import {
  MdHome,
  MdOutlineExplore,
  MdSubscriptions,
  MdHistory,
} from "react-icons/md";
import { useContext } from "react";
import { Context } from "../context/context";
import { IoMdClose } from "react-icons/io";
const MobileSidebar = () => {
  let { sidebaropen, setOpensidebar } = useContext(Context);
  if (!open) return null;

  return (
    <>
      {" "}
      {sidebaropen === true ? (
        <>
          <div className="  fixed inset-0 bg-black/60 z-40 "></div>

          {/* Sidebar */}
          <aside className=" fixed top-0 left-0 h-full w-64 bg-black z-50 border-r border-zinc-800">
            {/* Header */}
            <div className="  h-14 flex justify-between items-center px-4 border-b border-zinc-800">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                className="h-5"
                alt="YouTube"
              />

              <IoMdClose
                className="text-white text-[23px] cursor-pointer"
                onClick={() => {
                  setOpensidebar(false);
                }}
              />
            </div>

            {/* Menu */}
            <nav className="py-2 text-white text-sm">
              <Link
                to="/"
                className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-900"
              >
                <MdHome /> Home
              </Link>
              <Link
                to="/shorts"
                className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-900"
              >
                <MdOutlineExplore /> Shorts
              </Link>

              <Link className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-900">
                <MdSubscriptions />
                Subscriptions
              </Link>
              <hr className="border-zinc-800 my-2" />

              <Link
                to="/history"
                className="flex items-center gap-4 px-4 py-3 hover:bg-zinc-900"
              >
                <MdHistory />
                History
              </Link>
            </nav>
          </aside>
        </>
      ) : (
        ""
      )}
    </>
  );
  {
    /* Overlay */
  }
};

export default MobileSidebar;
