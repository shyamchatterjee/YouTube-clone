import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./page/home";
import Watch from "./page/watch";
import Login from "./page/login";
import Register from "./page/register";
import Navbar from "./component/nabar";
import { ToastContainer } from "react-toastify";
import { ContextFunction } from "./context/context";
import Searchdeta from "./page/searchdeta";
import Shorts from "./page/shorts";
import Sidebar from "./component/sidebar";
import MobileSidebar from "./component/mobilesidebar";
import History from "./page/history";

function App() {
  return (
    <BrowserRouter>
      <ContextFunction>
        <ToastContainer />

        {/* Navbar stays on all pages */}
        <Navbar />

        <MobileSidebar />
        {/* Page Content */}
        <div className=" min-h-screen text-white pt-14">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watch/:videoId" element={<Watch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Searchdeta />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/history" element={<History />} />
            {/* Optional 404 */}
            <Route
              path="*"
              element={
                <h1 className="text-center mt-20 text-xl">Page Not Found</h1>
              }
            />
          </Routes>
        </div>
      </ContextFunction>
    </BrowserRouter>
  );
}

export default App;
