import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import TextArea from "./TextArea";
import Replies from "./Replies";

function Comment({ comment }) {
  const [showReplies, setShowReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleText = (e) => {
    setReplyText(e.target.value);
  };

  const handleCancel = () => {
    setReplyText("");
    setAddReply(false);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between">
        <p className="font-bold cursor-pointer">@{comment.username}</p>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-300">
          <p>{comment.time}</p>
          <BsThreeDots className="cursor-pointer text-lg" />
        </div>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">
        {comment.comment_text}
      </p>

      <div className="flex gap-3">
        <div className="flex gap-1">
          <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
          <p>{comment.likes}</p>
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
          addReply={addReply}
          text={replyText}
          handleText={handleText}
          handleCancel={handleCancel}
        />
      )}

      {comment.replies.length > 0 && (
        <button
          onClick={handleShowReplies}
          className="w-fit px-4 py-1 rounded-full flex items-center gap-2 text-blue-800 cursor-pointer hover:bg-[rgba(91,91,226,0.3)] dark:text-blue-500"
        >
          <IoIosArrowDown
            className={showReplies ? "transform rotate-180" : ""}
          />
          <p>{comment.replies.length} replies</p>
        </button>
      )}
      {showReplies && (
        <div className="ml-[2rem] flex flex-col gap-[1rem]">
          {comment.replies.map((reply) => (
            <Replies key={reply.reply_id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
