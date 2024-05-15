import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext'; // Make sure this import path is correct
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import BrowseBooks from './components/BrowseBooks';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // Uses context to check if user is authenticated
  return user ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App app-background">
          <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/books" element={
              <ProtectedRoute>
                <BrowseBooks />
              </ProtectedRoute>
            } />
            {/* Add more routes as needed */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
