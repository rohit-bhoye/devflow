import { createContext, useReducer } from "react";
import project_collection from "../assets/assets";
export const ProjectsContext = createContext();

const projectsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      const AddComment = state.map((project) =>
        project.id === action.projectId
          ? { ...project, comments: [...project.comments, action.newComment] }
          : project
      );

      return AddComment;

    case "ADD_REPLY":
      const addReply = state.map((project) =>
        project.id === action.projectId
          ? {
              ...project,
              comments: project.comments.map((comment) =>
                comment.comment_id === action.commentId
                  ? {
                      ...comment,
                      replies: [...comment.replies, action.newReply],
                    }
                  : comment
              ),
            }
          : project
      );
      return addReply;

    case "PROJECT_LIKE":
      const projectLike = state.map((project) =>
        project.id === action.projectId
          ? {
              ...project,
              likes: new Set(project.likes).has(action.userId)
                ? (() => {
                    const updatedLikes = new Set(project.likes);
                    updatedLikes.delete(action.userId);
                    return updatedLikes;
                  })()
                : (() => {
                    const updatedLikes = new Set(project.likes);
                    updatedLikes.add(action.userId);
                    return updatedLikes;
                  })(),
            }
          : project
      );
      return projectLike;

    default:
      return state;
  }
};

const ProjectsDataProvider = ({ children }) => {
  const [projectsData, dispatch] = useReducer(
    projectsReducer,
    project_collection
  );

  const userId = 1234;
  return (
    <ProjectsContext.Provider value={{ projectsData, dispatch, userId }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsDataProvider;
