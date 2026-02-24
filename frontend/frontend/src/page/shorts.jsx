import { useEffect, useState } from "react";
import { BiLike, BiComment, BiShare, BiSidebar } from "react-icons/bi";
import Sidebar from "../component/sidebar";

const Shorts = () => {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/youtube/getdeta", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setShorts(data));
  }, []);

  return (
    <>
      <div className="bg-black h-screen w-full overflow-y-scroll snap-y snap-mandatory  ">
        {shorts?.map((video) => (
          <div
            key={video?.id}
            className="h-screen w-full snap-start relative flex justify-center items-center "
          >
            <iframe
              src={`https://www.youtube.com/embed/${video?.id}?autoplay=1&mute=1&controls=0&loop=1`}
              className="w-full h-full"
              allow="autoplay"
            ></iframe>

            <div className="absolute right-4 bottom-24 text-white flex flex-col gap-6">
              <button className="flex flex-col items-center">
                <BiLike size={26} />
                <span className="text-xs">{video?.statistics?.likeCount}</span>
              </button>

              <button className="flex flex-col items-center">
                <BiComment size={26} />
                <span className="text-xs">
                  {video?.statistics?.commentCount}
                </span>
              </button>

              <button className="flex flex-col items-center">
                <BiShare size={26} />
                <span className="text-xs">Share</span>
              </button>
            </div>

            <div className="absolute bottom-6 left-4 text-white max-w-[70%]">
              <p className="font-semibold">{video?.snippet?.channelTitle}</p>
              <p className="text-sm line-clamp-2">{video.snippet.title}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Shorts;
