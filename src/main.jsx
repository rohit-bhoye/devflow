import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./Context/ThemeContext.jsx";
import ProjectsDataProvider from "./Context/ProjectsContext.jsx";
import LoginProvider from "./Context/LoginContext.jsx";
import ProfileProvider from "./Context/ProfileContext.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <LoginProvider>
          <ProfileProvider>
            <ProjectsDataProvider>
              <App />
            </ProjectsDataProvider>
          </ProfileProvider>
        </LoginProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
