import { Link } from "react-router";
import {
  MdHome,
  MdOutlineExplore,
  MdSubscriptions,
  MdHistory,
} from "react-icons/md";
const Sidebar = () => {
  return (
    <div className="w-56 bg-black text-white hidden md:block fixed left-0 top-14 h-full px-4">
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
    </div>
  );
};

export default Sidebar;
