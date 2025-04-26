import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./Context/ThemeContext.jsx";
import ProjectsDataProvider from "./Context/ProjectsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ProjectsDataProvider>
          <App />
        </ProjectsDataProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
