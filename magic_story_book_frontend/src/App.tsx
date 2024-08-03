// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CreateStoryPage from "./pages/CreateStoryPage";
import Story from "./pages/Story";
import LibraryPage from "./pages/LibraryPage";
import MyStoryPage from "./pages/MyStoryPage";
import AgeSelection from "./pages/AgeSelection";
import SigninPage from "./pages/SignupPage";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleSignin from "./components/GoogleSignin/GoogleSignin";
import Login from "./pages/Login";
import OAuth2Callback from "./pages/OAuth2Callback";
// import CharacterSelectionPage from "./pages/CharacterSelectionPage";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<CreateStoryPage />} />
        <Route path="/signup" element={<SigninPage />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route path="/login/oauth2/code/google" element={<GoogleSignin />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/my-story" element={<MyStoryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ageselection" element={<AgeSelection />} />
        <Route path="/story" element={<Story />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
