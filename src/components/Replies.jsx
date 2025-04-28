import React, { useContext, useEffect, useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import TextArea from "./TextArea";
import getTimeAgo from "../getTimeAgo";
import { ProjectsContext } from "../Context/ProjectsContext";
function Replies({ reply, projectId, commentId }) {
  const { dispatch } = useContext(ProjectsContext);
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    setTimeAgo(getTimeAgo(reply.time));
    return () => {
      setTimeAgo("");
    };
  }, [reply.time]);

  const handleText = (e) => {
    setReplyText(e.target.value);
  };

  const handleCancel = () => {
    setReplyText("");
    setAddReply(false);
  };

  const handleSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    const currentTime = new Date().getTime();
    const newReply = {
      reply_id: Date.now(),
      user_id: "u3",
      username: "rahul",
      reply_text: replyText,
      replying_to: reply.username,
      time: currentTime,
      likes: new Set(),
    };

    dispatch({
      type: "ADD_REPLY",
      projectId: projectId,
      commentId: commentId,
      newReply: newReply,
    });

    setReplyText("");
    setAddReply(false);
  };
  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between">
        <p className="font-bold cursor-pointer">@{reply.username}</p>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-300">
          <p>{timeAgo}</p>
          <BsThreeDots className="cursor-pointer text-lg" />
        </div>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300"></p>
      {reply.replying_to ? (
        <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">
          <span className="text-blue-800 dark:text-blue-500">
            @{reply.replying_to}
          </span>{" "}
          {reply.reply_text}
        </p>
      ) : (
        <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">
          {reply.reply_text}
        </p>
      )}

      <div className="flex gap-3">
        <div className="flex gap-1">
          <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
          <p>{reply.likes.size}</p>
        </div>

        <p
          role="button"
          onClick={() => setAddReply(true)}
          className="font-bold cursor-pointer"
        >
          Reply
        </p>
      </div>
      {addReply && (
        <TextArea
          btnText={"Reply"}
          handleSubmit={handleSubmit}
          addReply={addReply}
          text={replyText}
          handleText={handleText}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Replies;
