// pages/Watch.jsx
import { data, Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import Commentsection from "../component/commentsection";
import { BiDislike } from "react-icons/bi";

import { Context } from "../context/context";
export default function Watch() {
  const { videoId } = useParams(); // videoId from URL

  const [video, setVideo] = useState(null);
  const [upNext, setUpNext] = useState([]);
  let [likes, setlikes] = useState([]);
  let { savehistory } = useContext(Context);

  let getlike = () => {
    fetch("http://localhost:4000/api/youtube/getlike/" + videoId, {
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
        setlikes(value?.likes);
      });
  };
  // Fetch main video
  useEffect(() => {
    fetch(`http://localhost:4000/api/youtube/getvedio/${videoId}`, {
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
        setVideo(value?.vedio);
        savehistory(value?.vedio);
        getlike();
      });
  }, [videoId]);

  // Fetch up-next videos

  useEffect(() => {
    fetch(`http://localhost:4000/api/youtube/getdeta`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUpNext(data));
  }, [videoId]);
  let like = () => {
    fetch("http://localhost:4000/api/youtube/like/" + videoId, {
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
        console.log(value);
        getlike();
      });
  };
  let unlike = () => {
    fetch("http://localhost:4000/api/youtube/unlike/" + videoId, {
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
        getlike();
      });
  };

  if (!video) {
    return <div className="pt-16 text-white">Loading...</div>;
  }

  return (
    <div className="pt-16 flex flex-col lg:flex-row p-4 gap-6 bg-black text-white min-h-screen">
      <div className="flex-1">
        <div className="aspect-video bg-black rounded-lg overflow-hidden ">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            allowFullScreen
          />
        </div>

        <h2 className="mt-3  text-[2vw] md:text-xl md:font-semibold">
          {video?.snippet?.title}
        </h2>

        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="font-semibold text-white">
              {video?.snippet?.channelTitle}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-sm text-gray-600">
          <span>
            {Number(video?.statistics?.viewCount).toLocaleString()} views
          </span>
          <span className="flex items-center gap-0.5">
            <AiOutlineLike
              className="text-white text-[18px] cursor-pointer"
              onClick={like}
            />

            {Number(
              video?.statistics?.likeCount + likes?.length,
            ).toLocaleString()}
          </span>
          <span className="flex items-center gap-0.5">
            <BiDislike
              className="text-white text-[18px] cursor-pointer"
              onClick={unlike}
            />
          </span>
        </div>

        <Commentsection videoId={videoId} />
      </div>

      <div className=" hidden md:block w-full lg:w-[350px]">
        <h3 className="font-semibold mb-3">Up Next</h3>

        {upNext.map((v) => (
          <Link to="/">
            <div key={v.id.videoId} className="flex gap-2 mb-3 cursor-pointer">
              <img
                src={v?.snippet?.thumbnails?.medium?.url}
                className="w-40 rounded"
                alt="thumbnail"
              />
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  {v?.snippet?.title}
                </p>
                <p className="text-xs text-gray-400">
                  {v?.snippet?.channelTitle}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
