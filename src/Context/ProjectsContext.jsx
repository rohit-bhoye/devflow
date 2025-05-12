import { createContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseCongfig";
export const ProjectsContext = createContext();

// --------------------------------------ProjectsDataProvider--------------------------------------//

const ProjectsDataProvider = ({ children }) => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjectsData = async () => {
    try {
      const projectsRef = collection(db, "projects");
      const q = query(projectsRef, orderBy("createdAt", "desc"));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjectsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchProjectsData();

    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProjectsData(data);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  return (
    <ProjectsContext.Provider value={{ projectsData }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsDataProvider;
