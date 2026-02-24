import { useContext, useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { Context } from "../context/context";

export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  let [localcomment, setlocalcomment] = useState([]);
  let [text, setText] = useState("");
  let { account } = useContext(Context);
  let getcomment = () => {
    fetch(`http://localhost:4000/api/youtube/getcomment/${videoId}`, {
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
        setComments(value?.actualcomment);
        setlocalcomment(value?.localcomment);
      });
  };

  useEffect(() => {
    getcomment();
  }, [videoId]);
  let postcomment = (text) => {
    fetch(`http://localhost:4000/api/youtube/comment/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ text: text }),
    })
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        if (value.ok) {
          getcomment();
          setText("");
        }
      });
  };

  let commentlike = (id) => {
    fetch("http://localhost:4000/api/youtube/commentlike/" + id, {
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
        getcomment();
      });
  };
  return (
    <div className="mt-6 text-white">
      <h3 className="text-lg font-semibold mb-4">
        {comments?.length + localcomment?.length} Comments
      </h3>

      <div className="flex gap-3 mb-6">
        <div className="w-10 h-10 rounded-full ">
          <img src={account?.image} className="rounded-[50%] bg-cover" alt="" />
        </div>
        <div className="w-full flex flex-col">
          <input
            placeholder="Add a comment..."
            value={text}
            className="  flex-1 bg-transparent border-b border-gray-600 outline-none pb-2 text-sm"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setText("")}
              className="text-sm text-gray-400"
            >
              Cancel
            </button>

            <button
              className="bg-blue-500 text-black px-4 py-1 rounded-full text-sm font-medium"
              onClick={() => postcomment(text)}
            >
              Comment
            </button>
          </div>
        </div>
      </div>

      {localcomment.map((element, index) => {
        return (
          <>
            <div key={index} className="hidden  md:flex gap-3 mb-6 ">
              {element?.comment_user_id?.image && (
                <img
                  src={element?.comment_user_id?.image}
                  className="w-10 h-10 rounded-full"
                  alt=""
                />
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {element?.comment_user_id?.name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(element?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p
                  className="text-sm mt-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: element?.text }}
                />

                <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-0.5">
                    <BiLike
                      className="text-white  cursor-pointer"
                      onClick={() => commentlike(element?._id)}
                    />
                    {element?.comment_likes?.length}
                  </span>
                  <span className="cursor-pointer hover:text-white">Reply</span>
                </div>
              </div>
            </div>
            <div key={index} className="flex gap-3 mb-6  md:hidden">
              <img
                src={element?.comment_user_id?.image}
                className="w-8 h-8 rounded-full"
                alt=""
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[2vw]  font-semibold">
                    {element?.comment_user_id?.name}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(element?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p
                  className="text-[2vw] md:text-sm mt-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: element?.text }}
                />

                <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-0.5">
                    <BiLike
                      className="text-white  cursor-pointer"
                      onClick={() => commentlike(element?._id)}
                    />{" "}
                    {element?.comment_likes?.length}
                  </span>
                  <span className="cursor-pointer hover:text-white">Reply</span>
                </div>
              </div>
            </div>{" "}
          </>
        );
      })}
      {comments?.map((item, index) => {
        const c = item?.snippet?.topLevelComment?.snippet;

        return (
          <>
            <div key={index} className="hidden  md:flex gap-3 mb-6 ">
              {c?.authorProfileImageUrl && (
                <img
                  src={c?.authorProfileImageUrl}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
              )}

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[1vw]  font-semibold">
                    {c?.authorDisplayName}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(c?.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <p
                  className="text-[2vw]   md:text-sm mt-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: c?.textDisplay }}
                />

                <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-0.5">
                    <BiLike className="text-white" /> {c?.likeCount}
                  </span>
                  <span className="cursor-pointer hover:text-white">Reply</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mb-6  md:hidden">
              <img
                src={c?.authorProfileImageUrl}
                className="w-8 h-8 rounded-full"
                alt=""
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-[2vw]  font-semibold">
                    {c?.authorDisplayName}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(c?.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <p
                  className="text-[2vw] md:text-sm mt-1 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: c?.textDisplay }}
                />

                <div className="flex items-center gap-4 mt-2 text-gray-400 text-xs">
                  <span className="flex items-center gap-0.5">
                    <BiLike className="text-white" /> {c?.likeCount}
                  </span>
                  <span className="cursor-pointer hover:text-white">Reply</span>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
