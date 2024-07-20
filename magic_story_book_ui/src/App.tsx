import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateStoryPage from "./pages/CreateStoryPage";
import DisplayStoryPage from "./pages/DisplayStoryPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-story" Component={CreateStoryPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/profile" Component={ProfilePage} />
        <Route path="/display-story/:id" Component={DisplayStoryPage} />
      </Routes>
    </Router>
  );
};

export default App;
