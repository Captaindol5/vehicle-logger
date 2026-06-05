import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { useTheme } from './context/ThemeContext.jsx';
import Navigation from './components/Navigation.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VehicleDetails from './pages/VehicleDetails.jsx';
import AddVehicle from './pages/AddVehicle.jsx';
import AddLog from './pages/AddLog.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import AboutUs from './pages/AboutUs.jsx';
import Services from './pages/Services.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

function App() {
  const { theme } = useTheme();

  // Apply theme to body
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.className = 'bg-slate-900 text-slate-100 transition-colors duration-300';
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 transition-colors duration-300';
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen pb-20 md:pb-0 md:pt-16">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <>
              <Navigation />
              <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                <Dashboard />
              </main>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/vehicle/new" element={
          <ProtectedRoute>
            <>
              <Navigation />
              <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                <AddVehicle />
              </main>
            </>
          </ProtectedRoute>
        } />

        <Route path="/vehicle/:id" element={
          <ProtectedRoute>
            <>
              <Navigation />
              <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                <VehicleDetails />
              </main>
            </>
          </ProtectedRoute>
        } />
        
        <Route path="/vehicle/:id/log/new" element={
          <ProtectedRoute>
            <>
              <Navigation />
              <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                <AddLog />
              </main>
            </>
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <>
              <Navigation />
              <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 animate-fade-in">
                <Profile />
              </main>
            </>
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;
