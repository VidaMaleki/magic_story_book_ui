import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CreateStoryPage from "./pages/CreateStoryPage";

import LibraryPage from "./pages/LibraryPage";
import AgeSelection from "./pages/AgeSelection";
import SigninPage from "./pages/SignupPage";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleSignin from "./components/GoogleSignin/GoogleSignin";
import Login from "./pages/Login";
import OAuth2Callback from "./pages/OAuth2Callback";
import StoryPage from "./pages/Story";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<CreateStoryPage />} />
        <Route path="/create-story" element={<CreateStoryPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/signup" element={<SigninPage />} />
        <Route path="/oauth2/callback" element={<OAuth2Callback />} />
        <Route path="/login/oauth2/code/google" element={<GoogleSignin />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ageselection" element={<AgeSelection />} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
