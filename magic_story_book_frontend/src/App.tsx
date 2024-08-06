import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateStoryPage from "./pages/CreateStoryPage";
import LibraryPage from "./pages/LibraryPage";
import AgeSelection from "./pages/AgeSelection";
import SignInPage from "./pages/SignupPage";
import ErrorBoundary from "./components/ErrorBoundary";
import GoogleSignin from "./components/GoogleSignin/GoogleSignin";
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
            <Route path="/signup" element={<SignInPage />} />
            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
            <Route path="/login/oauth2/code/google" element={<GoogleSignin />} />
            <Route path="/story" element={<StoryPage />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <CreateStoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <LibraryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ageselection"
              element={
                <ProtectedRoute>
                  <AgeSelection />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
