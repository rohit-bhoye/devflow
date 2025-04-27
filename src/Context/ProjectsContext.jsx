import { createContext, useState } from "react";
import project_collection from "../assets/assets";
export const ProjectsContext = createContext();

const ProjectsDataProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState(project_collection);
  return (
    <ProjectsContext.Provider value={{ projectsData, setProjectsData }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsDataProvider;
