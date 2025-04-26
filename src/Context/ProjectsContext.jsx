import { createContext, useState } from "react";
import project_collection from "../assets/assets";
export const ProjectsConetxt = createContext();

const ProjectsDataProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState(project_collection);
  return (
    <ProjectsConetxt.Provider value={{ projectsData, setProjectsData }}>
      {children}
    </ProjectsConetxt.Provider>
  );
};

export default ProjectsDataProvider;
