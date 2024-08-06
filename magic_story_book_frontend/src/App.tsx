import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateStoryPage from "./pages/CreateStoryPage";
import LibraryPage from "./pages/LibraryPage";
import AgeSelection from "./pages/AgeSelection";
import SigninPage from "./pages/SignupPage";
import ErrorBoundary from "./components/ErrorBoundary";
import OAuth2Callback from "./pages/OAuth2Callback";
import StoryPage from "./pages/Story";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
        <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <CreateStoryPage />
                </ProtectedRoute>
              }
            />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/signup" element={<SigninPage />} />
            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/ageselection" element={<AgeSelection />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
