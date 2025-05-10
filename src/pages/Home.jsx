import React, { useContext } from "react";
import { ProjectsContext } from "../Context/ProjectsContext";

import Project from "../components/Project";

function Home() {
  const { projectsData } = useContext(ProjectsContext);

  return (
    <div className="flex flex-col gap-[2rem] w-full">
      {projectsData.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}

export default Home;
