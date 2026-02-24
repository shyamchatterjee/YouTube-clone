import { useContext, useEffect } from "react";
import { Context } from "../context/context";
import { Link } from "react-router";

let Searchdeta = () => {
  let { getsearchdeta, deta } = useContext(Context);
  useEffect(() => {
    getsearchdeta();
  }, []);

  return (
    <>
      {deta.length === 0 ? (
        <p className="text-center">Searching...</p>
      ) : (
        <div className="pt-16 px-4 md:px-10 bg-black min-h-screen text-white">
          {deta?.map((video) => (
            <Link
              to={`/watch/${video?.id?.videoId}`}
              key={video.id.videoId}
              className="flex gap-4 mb-6 hover:bg-zinc-900 p-2 rounded-lg"
            >
              <img
                src={video?.snippet?.thumbnails?.medium?.url}
                alt={video?.snippet?.title}
                className="  w-30 h-15 md:w-56 md:h-32 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h2 className="font-semibold text-[2vw] md:text-base line-clamp-2">
                  {video?.snippet?.title}
                </h2>

                <p className="text-[2vw] text-zinc-400 mt-1">
                  {video?.snippet?.channelTitle}
                </p>

                <p className="text-[2vw] md:text-[22px] text-zinc-500 mt-1 line-clamp-2 hidden md:block">
                  {video?.snippet?.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
export default Searchdeta;
