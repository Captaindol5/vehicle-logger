import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaHome, FaCar, FaSignOutAlt, FaMoon, FaSun, FaBars, FaTimes, FaUser } from 'react-icons/fa';

export default function Navigation() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Garages (Dashboard)', path: '/dashboard', icon: <FaHome /> },
    { name: 'Add Vehicle', path: '/vehicle/new', icon: <FaCar /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  return (
    <>
      {/* Top Bar with Hamburger */}
      <header className="fixed top-0 w-full glass-card border-x-0 border-t-0 rounded-none z-40 h-16 flex items-center px-4 justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsOpen(true)} 
            className="p-2 text-slate-400 hover:text-emerald-500 transition-colors focus:outline-none"
          >
            <FaBars className="text-2xl" />
          </button>
          <div className="text-emerald-500 font-bold text-xl flex items-center gap-2">
            <FaCar className="text-2xl" /> AutoLog
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/')} 
            className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-emerald-400" 
            title="Go to Home"
          >
            <FaHome className="text-xl" />
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-emerald-400">
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar / Hamburger Menu */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'} light:bg-white light:border-slate-200`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 light:border-slate-200">
          <span className="text-emerald-500 font-bold text-xl">Menu</span>
          <button 
            onClick={() => setIsOpen(false)} 
            className="p-2 text-slate-400 hover:text-red-500 transition-colors focus:outline-none"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="flex-1 py-6 flex flex-col gap-2 px-4">
          {navItems.map(item => (
            <NavLink 
              key={item.name} 
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-emerald-500/10 text-emerald-500' : 'text-slate-400 hover:bg-slate-800 light:hover:bg-slate-100 hover:text-emerald-400'}`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 light:border-slate-200">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <span className="text-xl"><FaSignOutAlt /></span>
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
