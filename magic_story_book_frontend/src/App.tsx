// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import CreateStoryPage from "./pages/CreateStoryPage";
import DisplayStoryPage from "./pages/DisplayStoryPage";
import LibraryPage from "./pages/LibraryPage";
import MyStoryPage from "./pages/MyStoryPage";
import AgeSelection from "./pages/AgeSelection";
import CharacterSelectionPage from "./pages/CharacterSelectionPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateStoryPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/my-story" element={<MyStoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ageselection" element={<AgeSelection />} />
        <Route path="/characters" element={<CharacterSelectionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/display-story/:id" element={<DisplayStoryPage />} />
      </Routes>
    </Router>
  );
};

export default App;
