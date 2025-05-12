import React, { useContext, useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import TextArea from "./TextArea";
import Replies from "./Replies";
import getTimeAgo from "../getTimeAgo";
import { assets } from "../assets/assets";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseCongfig";
import { LoginContext } from "../Context/LoginContext";
import { ProfileContext } from "../Context/ProfileContext";

function Comment({ comment, projectId }) {
  const { user } = useContext(LoginContext);
  const { userProfile } = useContext(ProfileContext);

  const [showReplies, setShowReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [likes, setLikes] = useState([]);
  const [replies, setReplies] = useState([]);

  const userId = user?.uid || null;

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

  // --------------------------------------ADD_REPLY--------------------------------------//

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentTime = new Date().getTime();
    const newReply = {
      user_id: userId,
      username: userProfile.username,
      profile_photo: userProfile.photoURL,
      reply_text: replyText,
      replying_to: comment.username,
      time: currentTime,
      likes: [],
    };

    try {
      await addDoc(
        collection(
          db,
          "projects",
          projectId,
          "comments",
          comment.comment_id,
          "replies"
        ),
        {
          ...newReply,
        }
      );
      setReplyText("");
      setAddReply(false);
      setShowReplies(true);
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  useEffect(() => {
    const repliesRef = collection(
      db,
      "projects",
      projectId,
      "comments",
      comment.comment_id,
      "replies"
    );

    const q = query(repliesRef, orderBy("time", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const repliesData = querySnapShot.docs.map((doc) => ({
        reply_id: doc.id,
        ...doc.data(),
      }));
      setReplies(repliesData);
    });

    return () => unsubscribe();
  }, [projectId, comment.comment_id]);

  // --------------------------------------HANDLE_COMMENT_LIKE--------------------------------------//

  const handleCommentLike = async () => {
    try {
      const commentRef = doc(
        db,
        "projects",
        projectId,
        "comments",
        comment.comment_id
      );

      const commentSnap = await getDoc(commentRef);
      const commentData = commentSnap.data();
      const alreadyLiked = commentData.likes?.includes(userId);
      await updateDoc(commentRef, {
        likes: alreadyLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  useEffect(() => {
    const commentRef = doc(
      db,
      "projects",
      projectId,
      "comments",
      comment.comment_id
    );
    const unsubscribe = onSnapshot(commentRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || []);
      }
    });

    return () => unsubscribe();
  }, [projectId, comment.comment_id]);

  return (
    <div className="w-full flex gap-4">
      <div>
        <img
          src={
            comment.profile_photo ? comment.profile_photo : assets.empty_profile
          }
          alt="profile"
          className="w-[35px] h-[35px] rounded-full"
        />
      </div>
      <div className="w-full flex flex-col gap-1 justify-center">
        <div className="flex justify-between gap-3 w-full">
          <p className="font-semibold cursor-pointer">@{comment.username}</p>
          <div className="w-full flex items-center justify-between gap-4 text-zinc-500 dark:text-zinc-300">
            <p className="text-sm">{timeAgo}</p>
            <BsThreeDots className="cursor-pointer text-lg" />
          </div>
        </div>
        <p className="text-zinc-600 dark:text-zinc-300 pr-[1rem]">
          {comment.comment_text}
        </p>

        <div className="flex gap-3 mt-[10px]">
          <div className="flex gap-1 select-none">
            <div role="button" onClick={handleCommentLike}>
              {likes.includes(userId) ? (
                <BsHandThumbsUpFill className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
              ) : (
                <BsHandThumbsUp className="transform -scale-x-100 h-[1.3rem] w-[1.3rem] cursor-pointer" />
              )}
            </div>

            <p>{likes.length}</p>
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

        {replies.length > 0 && (
          <button
            onClick={handleShowReplies}
            className="w-fit px-4 py-1 rounded-full flex items-center gap-2 text-blue-800 cursor-pointer hover:bg-[rgba(91,91,226,0.3)] dark:text-blue-500"
          >
            <IoIosArrowDown
              className={showReplies ? "transform rotate-180" : ""}
            />
            <p>{replies.length} replies</p>
          </button>
        )}
        {showReplies && (
          <div className="ml-[2rem] flex flex-col gap-[1rem]">
            {replies.map((reply) => (
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
    </div>
  );
}

export default Comment;
