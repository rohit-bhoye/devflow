import logo from "./logo.png";
import contact from "./contact_img.png";
import empty_profile from "./empty_profile.png";

export const assets = {
  logo,
  contact,
  empty_profile,
};

const project_collection = [
  {
    id: 1,
    profile_photo: logo,
    username: "Shanks",
    time: "7h",
    project_name: "E-commerce App",
    project_image: [contact],
    project_description:
      "Having unique usernames is the better approach to avoid confusion, ensure proper identification of users, and maintain a clean user experience on your platform. If you're planning on building out features like user profiles, following systems, or comments, uniqueness will be crucial for preventing any issues.",
    tools: ["React", "Firebase", "html", "css", "javascript", "react-router"],
    likes: new Set(),
    comments: [
      {
        comment_id: "c1",
        user_id: "u1",
        username: "shanks",
        profile_photo: "shanks.jpg",
        comment_text: "This project looks awesome!",
        time: "2h",
        likes: new Set(),
        replies: [],
      },
      {
        comment_id: "c2",
        user_id: "u2",
        username: "devmaster",
        profile_photo: "devmaster.jpg",
        comment_text: "I love the UI design.",
        time: "1h",
        likes: new Set(),
        replies: [
          {
            reply_id: "r1",
            user_id: "u3",
            username: "coder101",
            reply_text:
              "Having unique usernames is the better approach to avoid confusion, ensure proper identification of users, and maintain a clean user experience on your platform. If you're planning on building out features like user profiles, following systems, or comments, uniqueness will be crucial for preventing any issues.",
            replying_to: "devmaster",
            time: "55m",
            likes: new Set(),
          },
          {
            reply_id: "r2",
            user_id: "u4",
            username: "frontendfan",
            reply_text: "True! I wish more projects had this kind of layout.",
            replying_to: "coder101",
            time: "50m",
            likes: new Set(),
          },
          {
            reply_id: "r3",
            user_id: "u2",
            username: "devmaster",
            reply_text: "Thanks! Working on adding dark mode too.",
            replying_to: "frontendfan",
            time: "45m",
            likes: new Set(),
          },
        ],
      },
      {
        comment_id: "c3",
        user_id: "u5",
        username: "reactlover",
        profile_photo: "reactlover.jpg",
        comment_text: "Can you share the GitHub repo?",
        time: "30m",
        likes: new Set(),
        replies: [],
      },
    ],
    links: {
      github: "https://github.com/shanks/my-awesome-project",
      live: "https://my-awesome-project.com",
    },
  },
];

export default project_collection;
