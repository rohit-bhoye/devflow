import React, { useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import TextArea from "./TextArea";
function Replies({ reply }) {
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");

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
        <p className="font-bold cursor-pointer">@{reply.username}</p>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-300">
          <p>{reply.time}</p>
          <BsThreeDots className="cursor-pointer text-lg" />
        </div>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300"></p>
      {reply.replying_to ? (
        <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">
          <span className="text-blue-800 dark:text-blue-500">@{reply.replying_to}</span>{" "}
          {reply.reply_text}
        </p>
      ) : (
        <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">{reply.reply_text}</p>
      )}

      <div className="flex gap-3">
        <div className="flex gap-1">
          <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
          <p>{reply.likes}</p>
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
    </div>
  );
}

export default Replies;
