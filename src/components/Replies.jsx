import React, { useContext, useEffect, useState } from "react";
import { BsHandThumbsUp } from "react-icons/bs";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import TextArea from "./TextArea";
import getTimeAgo from "../getTimeAgo";
import { LoginContext } from "../Context/LoginContext";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseCongfig";
import { ProfileContext } from "../Context/ProfileContext";
import { assets } from "../assets/assets";

function Replies({ reply, projectId, commentId }) {
  const { userProfile } = useContext(ProfileContext);
  const { user } = useContext(LoginContext);

  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [likes, setLikes] = useState([]);

  const userId = user?.uid || null;

  // --------------------------------------SETTIMEAGO useEFFECT--------------------------------------//

  useEffect(() => {
    setTimeAgo(getTimeAgo(reply.time));
    return () => {
      setTimeAgo("");
    };
  }, [reply.time]);

  // --------------------------------------HANDLE_REPLY_TEXT--------------------------------------//
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
    console.log("hi");
    e.preventDefault();
    const currentTime = new Date().getTime();
    const newReply = {
      user_id: userId,
      username: userProfile.username,
      profile_photo: userProfile.photoURL,
      reply_text: replyText,
      replying_to: reply.username,
      time: currentTime,
      likes: [],
    };

    try {
      await addDoc(
        collection(db, "projects", projectId, "comments", commentId, "replies"),
        {
          ...newReply,
        }
      );
      setReplyText("");
      setAddReply(false);
    } catch (error) {
      console.error("Failed to add reply:", error);
    }
  };

  // --------------------------------------HANDLE_REPLY_LIKE--------------------------------------//

  const handleReplyLike = async () => {
    try {
      const replyRef = doc(
        db,
        "projects",
        projectId,
        "comments",
        commentId,
        "replies",
        reply.reply_id
      );

      const replySnap = await getDoc(replyRef);
      const replyData = replySnap.data();
      const alreadyLiked = replyData.likes?.includes(userId);

      await updateDoc(replyRef, {
        likes: alreadyLiked ? arrayRemove(userId) : arrayUnion(userId),
      });
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  useEffect(() => {
    const replyRef = doc(
      db,
      "projects",
      projectId,
      "comments",
      commentId,
      "replies",
      reply.reply_id
    );

    const unsubscribe = onSnapshot(replyRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLikes(data.likes || []);
      }
    });

    return () => unsubscribe();
  }, [projectId, commentId, reply.reply_id]);

  return (
    <div className="w-full flex gap-4">
      <div>
        <img
          src={reply.profile_photo ? reply.profile_photo : assets.empty_profile}
          alt="profile"
          className="w-[25px] h-[25px] rounded-full"
        />
      </div>
      <div className="w-full flex flex-col gap-1 justify-center">
        <div className="w-full flex justify-between gap-3">
          <p className="font-bold cursor-pointer">@{reply.username}</p>
          <div className="w-full flex items-center justify-between gap-4 text-zinc-500 dark:text-zinc-300">
            <p className="text-sm">{timeAgo}</p>
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

        <div className="flex gap-3 mt-[10px]">
          <div className="flex gap-1 select-none">
            <div role="button" onClick={handleReplyLike}>
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
      </div>
    </div>
  );
}

export default Replies;
