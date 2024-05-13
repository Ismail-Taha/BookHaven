import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';  // Import the context
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import BrowseBooks from './components/BrowseBooks';  // Assuming this component is now added
import './styles/main.css';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();  // Use the auth context
  return user ? children : <Navigate to="/signin" />;
};

function App() {
  return (
    <AuthProvider>  {/* Wrap your application in the AuthProvider */}
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
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
