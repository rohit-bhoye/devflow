import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";

function Comment({ comment }) {
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = () => {
    setShowReplies(!showReplies);
  };
  return (
    <div>
      <div>
        <p>{comment.username}</p>
        <div>
          <p>{comment.time}</p>
          <BsThreeDots />
        </div>
      </div>
      <p>{comment.comment_text}</p>

      <div>
        <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
        <p>{comment.likes}</p>
        <p>Reply</p>
      </div>

      {comment.replies.length > 0 && (
        <div role="button" onClick={handleShowReplies}>
          <IoIosArrowDown />
          <p>{comment.replies.length} replies</p>
        </div>
      )}
      {showReplies && (
        <div>
          {comment.replies.map((reply) => (
            <div key={reply.reply_id}>
              <div>
                <p>{reply.username}</p>
                <div>
                  <p>{reply.time}</p>
                  <BsThreeDots />
                </div>
              </div>
              <p>{reply.reply_text}</p>

              <div>
                <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
                <p>{reply.likes}</p>
                <p>Reply</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
