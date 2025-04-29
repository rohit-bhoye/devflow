import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import TextArea from "./TextArea";
import Replies from "./Replies";
import getTimeAgo from "../getTimeAgo";
import { ProjectsContext } from "../Context/ProjectsContext";

function Comment({ comment, projectId }) {
  const { dispatch, userId } = useContext(ProjectsContext);
  const [showReplies, setShowReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");

  // --------------------------------------SET_TIME_AGO--------------------------------------//
  useEffect(() => {
    setTimeAgo(getTimeAgo(comment.time));
    return () => {
      setTimeAgo("");
    };
  }, [comment.time]);

  // --------------------------------------SHOW_REPLIES--------------------------------------//
  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };

  // --------------------------------------REPLY_TEXT--------------------------------------//

  const handleText = (e) => {
    setReplyText(e.target.value);
  };

  // --------------------------------------HANDLE_CANCEL--------------------------------------//

  const handleCancel = () => {
    setReplyText("");
    setAddReply(false);
  };

  // --------------------------------------HANDLE_SUBMIT--------------------------------------//

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const newReply = {
      reply_id: Date.now(),
      user_id: "u3",
      username: "rahul",
      reply_text: replyText,
      replying_to: comment.username,
      time: currentTime,
      likes: new Set(),
    };

    // --------------------------------------ADD_REPLY--------------------------------------//

    dispatch({
      type: "ADD_REPLY",
      projectId: projectId,
      commentId: comment.comment_id,
      newReply: newReply,
    });
    setReplyText("");
    setAddReply(false);
  };

  // --------------------------------------HANDLE_COMMENT_LIKE--------------------------------------//

  const handleCommentLike = () => {
    dispatch({
      type: "COMMENT_LIKE",
      projectId: projectId,
      commentId: comment.comment_id,
      userId: userId,
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-between">
        <p className="font-bold cursor-pointer">@{comment.username}</p>
        <div className="flex items-center gap-4 text-zinc-500 dark:text-zinc-300">
          <p>{timeAgo}</p>
          <BsThreeDots className="cursor-pointer text-lg" />
        </div>
      </div>
      <p className="text-zinc-700 dark:text-zinc-300 pr-[1rem]">
        {comment.comment_text}
      </p>

      <div className="flex gap-3">
        <div className="flex gap-1 select-none">
          <div role="button" onClick={handleCommentLike}>
            {comment.likes.has(userId) ? (
              <BsHandThumbsUpFill className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
            ) : (
              <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
            )}
          </div>

          <p>{comment.likes.size}</p>
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
            <Replies
              key={reply.reply_id}
              reply={reply}
              projectId={projectId}
              commentId={comment.comment_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
