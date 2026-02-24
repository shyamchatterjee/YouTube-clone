import { Link } from "react-router";

const Vediocard = ({ video }) => {
  const { snippet, statistics } = video;

  return (
    <Link to={"/watch/" + video?.id}>
      <div className="group p-2 cursor-pointer">
        <div className="relative overflow-hidden rounded-xl">
          <img
            src={snippet?.thumbnails?.medium?.url}
            alt={snippet?.title}
            className="w-full aspect-video object-cover group-hover:scale-105 transition duration-300"
          />
        </div>

        <div className="flex gap-3 mt-3">
          <img
            src={snippet?.thumbnails?.default?.url}
            alt="channel"
            className="w-9 h-9 rounded-full"
          />

          <div>
            <h3 className="text-[2vw] md:text-base font-medium line-clamp-2">
              {snippet?.title}
            </h3>

            <p className="text-[2vw] md:text-sm text-gray-400 mt-1">
              {snippet?.channelTitle}
            </p>

            <p className="text-[2vw] md:text-sm text-gray-400">
              {statistics?.viewCount} views
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Vediocard;
