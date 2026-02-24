import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const History = () => {
  const [history, sethistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
    sethistory(storedHistory);
  }, []);
  let navigate = useNavigate();
  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-xl font-semibold mb-4">Watch history</h1>

      {history.length === 0 && <p className="text-gray-400">{navigate("/")}</p>}
      {history?.map((video) => {
        return (
          <Link to={"/watch/" + video?.id}>
            <div
              key={video?.id}
              className="flex gap-3 mb-4 hover:bg-[#272727] md:p-2 rounded"
            >
              <img
                src={video?.snippet?.thumbnails?.medium?.url}
                className="w-25 md:w-40 rounded"
                alt="thumb"
              />

              <div>
                <h3 className="font-[2vw]  md:font-medium line-clamp-2">
                  {video?.snippet?.channelTitle}
                </h3>

                <p className="text-[2vw]  md:text-sm text-gray-400">
                  {video?.snippet?.title.slice(0, 90)}
                </p>

                <p className="text-[2vw] md:text-xs text-gray-500">
                  Watched on {new Date(video?.watchedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default History;
