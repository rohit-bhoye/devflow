import React, { useRef } from "react";

function TextArea({
  btnText,
  text,
  handleText,
  handleCancel,
  handleSubmit,
  addReply,
}) {
  const textareaRef = useRef(null);
  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[1rem] px-[2px]">
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleText}
        onInput={handleInput}
        placeholder="Add a comment..."
        className="resize-none overflow-hidden w-full min-h-[1rem] p-[1rem] pb-[20px] border-[1px] dark:border-[1px] dark:border-gray-300 rounded-lg placeholder:text-lg focus:outline-2 focus:outline-zinc-500 dark:focus:outline-gray-300 "
      />
      {((text.trim().length > 0 && btnText === "Comment") || addReply) && (
        <div className="w-full flex justify-between px-[1rem]  mt-3 ">
          <button
            onClick={handleCancel}
            className="bg-zinc-300 dark:text-black  py-[5px] px-[10px] rounded-full  cursor-pointer hover:bg-zinc-500 hover:text-white select-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={text.trim().length === 0}
            className={`py-[5px] px-[10px] rounded-full text-white cursor-pointer select-none ${
              text.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700"
            }`}
          >
            {btnText}
          </button>
        </div>
      )}
    </form>
  );
}

export default TextArea;
