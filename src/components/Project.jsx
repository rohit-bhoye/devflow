import React, { useState } from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { RiSendPlaneFill } from "react-icons/ri";
import Comment from "./Comment";
import TextArea from "./TextArea";
function Project({ project }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const topcomments = project.comments.length;
  const allReplies = project.comments.map((c) => c.replies.flat());
  const total_comments = topcomments + allReplies.length;

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleText = (e) => {
    setCommentText(e.target.value);
  };

  const handleCancel = () => {
    setCommentText("");
  };

  return (
    <div className="bg-white flex flex-col gap-[2rem] w-full p-[1rem] border border-black/10 dark:bg-zinc-800 dark:text-white transition-colors duration-500 rounded-[8px]">
      <div className="flex gap-4 h-[5rem] ">
        <div className="h-full w-[5rem]  rounded-[50%] overflow-hidden">
          <img
            src={project.profile_photo}
            alt="profile-logo"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between py-2">
          <p className="font-[600] text-2xl">{project.username}</p>
          <p className="text-zinc-500 dark:text-zinc-300">{project.time}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-[500] text-xl text-zinc-700 dark:text-zinc-300">
          {project.project_name}
        </h2>
        <img
          src={project.project_image[0]}
          alt="project preview"
          className="w-full  max-h-[40rem] object-cover"
        />
        <div className="flex flex-wrap gap-4">
          {project.tools.map((tool, i) => (
            <p key={i} className="bg-zinc-200 py-1 px-2 dark:text-black">
              {tool}
            </p>
          ))}
        </div>
        <p className="text-zinc-500 dark:text-zinc-300">
          {project.project_description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <IoMdThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] " />
          <p className="text-zinc-500 dark:text-zinc-300 ">{project.likes}</p>
        </div>

        <div className="flex gap-2 text-zinc-500 dark:text-zinc-300 cursor-pointer hover:underline hover:decoration-1 hover:text-blue-900">
          {total_comments} comments
        </div>
      </div>
      <hr className=" w-full border-t border-t-zinc-300 dark:border-t-zinc-200" />

      {/* -----------------------------------Like----------------------------------- */}

      <div className="flex items-center justify-around">
        <div className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600">
          <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
          <p>Like</p>
        </div>

        {/* -----------------------------------Comment----------------------------------- */}

        <div
          role="button"
          onClick={handleShowComments}
          className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600"
        >
          <TfiCommentAlt className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
          <p>Comment</p>
        </div>

        {/* -----------------------------------Send----------------------------------- */}

        <div className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600">
          <RiSendPlaneFill className="h-[1.3rem] w-[1.3rem]" />
          <p>Send</p>
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          <TextArea
            btnText={"Comment"}
            text={commentText}
            handleText={handleText}
            handleCancel={handleCancel}
          />
          <div className="mt-[1rem] flex flex-col gap-[.8rem]">
            {project.comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
