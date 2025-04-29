import { createContext, useReducer } from "react";
import project_collection from "../assets/assets";
export const ProjectsContext = createContext();

// --------------------------------------REDUCER--------------------------------------//
const projectsReducer = (state, action) => {
  switch (action.type) {
    // --------------------------------------ADD_COMMENT--------------------------------------//

    case "ADD_COMMENT":
      const AddComment = state.map((project) =>
        project.id === action.projectId
          ? { ...project, comments: [...project.comments, action.newComment] }
          : project
      );

      return AddComment;

    // --------------------------------------ADD_REPLY--------------------------------------//

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

    // --------------------------------------PROJECT_LIKE--------------------------------------//

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

    // --------------------------------------COMMENT_LIKE--------------------------------------//

    case "COMMENT_LIKE":
      const commentLike = state.map((project) =>
        project.id === action.projectId
          ? {
              ...project,
              comments: project.comments.map((comment) =>
                comment.comment_id === action.commentId
                  ? {
                      ...comment,
                      likes: new Set(comment.likes).has(action.userId)
                        ? (() => {
                            const updatedLikes = new Set(comment.likes);
                            updatedLikes.delete(action.userId);
                            return updatedLikes;
                          })()
                        : (() => {
                            const updatedLikes = new Set(comment.likes);
                            updatedLikes.add(action.userId);
                            return updatedLikes;
                          })(),
                    }
                  : comment
              ),
            }
          : project
      );
      return commentLike;

    // --------------------------------------REPLY_LIKE--------------------------------------//

    case "REPLY_LIKE":
      const replyLike = state.map((project) =>
        project.id === action.projectId
          ? {
              ...project,
              comments: project.comments.map((comment) =>
                comment.comment_id === action.commentId
                  ? {
                      ...comment,
                      replies: comment.replies.map((reply) =>
                        reply.reply_id === action.replyId
                          ? {
                              ...reply,
                              likes: new Set(reply.likes).has(action.userId)
                                ? (() => {
                                    const updateLikes = new Set(reply.likes);
                                    updateLikes.delete(action.userId);
                                    return updateLikes;
                                  })()
                                : (() => {
                                    const updateLikes = new Set(reply.likes);
                                    updateLikes.add(action.userId);
                                    return updateLikes;
                                  })(),
                            }
                          : reply
                      ),
                    }
                  : comment
              ),
            }
          : project
      );

      return replyLike;

    default:
      return state;
  }
};

// --------------------------------------ProjectsDataProvider--------------------------------------//

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
