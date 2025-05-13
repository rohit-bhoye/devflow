import React, { useContext, useEffect, useState } from "react";
import { IoMdThumbsUp } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import Comment from "./Comment";
import TextArea from "./TextArea";
import getTimeAgo from "../getTimeAgo";
import { LoginContext } from "../Context/LoginContext";
import { db } from "../firebase/firebaseCongfig";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { assets } from "../assets/assets";
import { ProfileContext } from "../Context/ProfileContext";

function Project({ project, onPage }) {
  const { user } = useContext(LoginContext);
  const { userProfile } = useContext(ProfileContext);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [totalComments, setTotalComments] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const userId = user?.uid || null;

  const handleActionMenu = () => {
    setShowMenu(!showMenu);
  };

  // --------------------------------------SET_TOTAL_COMMENTS--------------------------------------//
  const fetchTotalComments = async () => {
    setTotalComments(comments.length);
    // try {
    //   let totalRepliesCount = 0;
    //   for (const comment of comments) {
    //     const repliesRef = collection(
    //       db,
    //       "projects",
    //       project.id,
    //       "comments",
    //       comment.comment_id,
    //       "replies"
    //     );
    //     const repliesSnapShot = await getDocs(repliesRef);
    //     totalRepliesCount += repliesSnapShot.docs.length;
    //   }
    //   const totalTopComments = comments.length;
    //   const total = totalTopComments + totalRepliesCount;
    //   setTotalComments(total);
    // } catch (error) {
    //   console.error("Error fetching replies count:", error);
    //   setTotalComments(comments.length);
    // }
  };

  useEffect(() => {
    if (comments.length > 0) {
      fetchTotalComments();
    }
  }, [comments, project.id]);

  // --------------------------------------SHOW_COMMENTS--------------------------------------//

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  // --------------------------------------HANDLE_COMMENT_TEXT--------------------------------------//

  const handleText = (e) => {
    setCommentText(e.target.value);
  };

  // --------------------------------------HANDLE_CANCEL--------------------------------------//

  const handleCancel = () => {
    setCommentText("");
  };

  // --------------------------------------HANDLE_COMMENT--------------------------------------//

  const handleComments = async (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const newComment = {
      user_id: userId,
      username: userProfile.username,
      profile_photo: userProfile.photoURL,
      comment_text: commentText,
      time: currentTime,
      likes: [],
      replies: [],
    };

    try {
      const projectRef = doc(db, "projects", project.id);

      await addDoc(collection(projectRef, "comments"), {
        ...newComment,
      });
      setCommentText("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  useEffect(() => {
    const commentsRef = collection(db, "projects", project.id, "comments");
    const q = query(commentsRef, orderBy("time", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const commentsData = querySnapShot.docs.map((doc) => ({
        comment_id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [project.id]);

  // --------------------------------------HANDLE_PROJECT_LIKE--------------------------------------//

  const handleProjectLike = async () => {
    try {
      const projectRef = doc(db, "projects", project.id);

      const projectSnap = await getDoc(projectRef);
      const projectData = projectSnap.data();
      const alreadyLiked = projectData.likes.includes(userId);
      await updateDoc(projectRef, {
        likes: alreadyLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  useEffect(() => {
    const projectRef = doc(db, "projects", project.id);
    const unsubscribe = onSnapshot(projectRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || []);
      }
    });

    return () => unsubscribe();
  }, [project.id]);

  return (
    <div className="bg-white flex flex-col gap-[2rem] w-full p-[1rem] border border-black/10 dark:bg-zinc-800 dark:text-white transition-colors duration-500 rounded-[8px]">
      <div className="w-full flex flex-row justify-between">
        {/* // --------------------------------------PROFILE_PHOTO--------------------------------------// */}

        <div className="flex gap-4 h-[5rem] ">
          <div className="h-full w-[5rem]  rounded-[50%] overflow-hidden">
            <img
              src={
                project.profile_photo
                  ? project.profile_photo
                  : assets.empty_profile
              }
              alt="profile-logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* // --------------------------------------USERNAME--------------------------------------// */}

          <div className="flex flex-col justify-between py-2">
            <p className="font-[600] text-2xl">{project.username}</p>
            <p className="text-zinc-500 dark:text-zinc-300">
              {project.createdAt
                ? getTimeAgo(project.createdAt.toDate().getTime())
                : "Just Now"}
            </p>
          </div>
        </div>
        <div className="relative">
          <BsThreeDots
            onClick={handleActionMenu}
            className="cursor-pointer text-xl"
          />
          {showMenu && (
            <ul className="absolute right-0 mt-2 w-[10rem] bg-white dark:bg-zinc-800 border-[1px] border-black/30 dark:border-white/30 rounded-md z-50 overflow-hidden">
              {onPage === "profile" && (
                <>
                  <li className="h-[2rem] border-b-[1px] border-black/30 dark:border-white/30 ">
                    <button className="h-full w-full text-center cursor-pointer">
                      Delete
                    </button>
                  </li>
                  <li className="h-[2rem]">
                    <button
                      onClick={() => setShowMenu(false)}
                      className="h-full w-full cursor-pointer"
                    >
                      Cancel
                    </button>
                  </li>
                </>
              )}
              {onPage === "home" && (
                <>
                  <li className="h-[2rem] border-b-[1px] border-black/30 dark:border-white/30 ">
                    <button className="h-full w-full text-center cursor-pointer">
                      Report
                    </button>
                  </li>
                  <li className="h-[2rem]">
                    <button
                      onClick={() => setShowMenu(false)}
                      className="h-full w-full cursor-pointer"
                    >
                      Cancel
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* // --------------------------------------NAME_IMAGE_TOOL_DESCRIPTION--------------------------------------// */}

      <div className="flex flex-col gap-4">
        <h2 className="font-[500] text-xl text-zinc-700 dark:text-zinc-300">
          {project.projectName}
        </h2>
        <img
          src={project.imageUrl}
          alt="project preview"
          className="w-full  h-[600px] object-cover"
        />
        <div className="flex flex-wrap gap-4">
          {project.tools.length > 0 &&
            project.tools.map((tool) => (
              <p
                key={tool.value}
                className="bg-zinc-200 py-1 px-2 dark:text-black rounded-[5px]"
              >
                {tool.label}
              </p>
            ))}
        </div>
        <p className="text-zinc-500 dark:text-zinc-300">
          {project.description}
        </p>
      </div>

      {/* // --------------------------------------LIKES--------------------------------------// */}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <IoMdThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] " />
          <p className="text-zinc-500 dark:text-zinc-300 ">{likes.length}</p>
        </div>

        <div
          role="button"
          onClick={handleShowComments}
          className="flex gap-2 text-zinc-500 dark:text-zinc-300 cursor-pointer hover:underline hover:decoration-1 hover:text-blue-900"
        >
          {totalComments} comments
        </div>
      </div>
      <hr className=" w-full border-t border-t-zinc-300 dark:border-t-zinc-200" />

      {/* -----------------------------------Like_BUTTON----------------------------------- */}

      <div className="flex items-center justify-around">
        <div
          role="button"
          onClick={handleProjectLike}
          className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600 select-none"
        >
          {likes.includes(userId) ? (
            <BsHandThumbsUpFill className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
          ) : (
            <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
          )}

          <p>Like</p>
        </div>

        {/* -----------------------------------Comment----------------------------------- */}

        <div
          role="button"
          onClick={handleShowComments}
          className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600 select-none"
        >
          <TfiCommentAlt className="transform -scale-x-100 h-[1.3rem] w-[1.3rem]" />
          <p>Comment</p>
        </div>

        {/* -----------------------------------Send----------------------------------- */}

        <div className="flex items-center gap-2 hover:bg-zinc-200 rounded-[5px] cursor-pointer py-[.5rem] px-[1rem] dark:hover:bg-zinc-600 select-none">
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
            handleSubmit={handleComments}
          />
          <div className="mt-[1rem] flex flex-col gap-[1rem]">
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment.comment_id}
                  comment={comment}
                  projectId={project.id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Project;
