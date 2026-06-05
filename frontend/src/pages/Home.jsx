import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaCarSide } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import homeImage from '../../images/home.jpg';

export default function Home() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation for Home Page */}
      <header className="w-full flex items-center justify-between p-4 lg:px-12 lg:py-6 bg-white dark:bg-slate-800 shadow-md z-10 transition-colors duration-300">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center shadow-lg">
            <FaCarSide className="text-white text-xl" />
          </div>
          <span className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white tracking-wider">AutoLog</span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-12">
          <button 
            onClick={() => navigate('/')} 
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors border-b-2 border-emerald-600 dark:border-emerald-400 pb-1"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/about')} 
            className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors"
          >
            About Us
          </button>
          <button 
            onClick={() => navigate('/services')} 
            className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors"
          >
            Services
          </button>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400"
            title="Toggle theme"
          >
            {theme === 'dark' ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors shadow-md"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section Split Layout */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full gap-8 px-6 lg:px-20 py-16 lg:py-20">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center animate-fade-in pr-0 lg:pr-8">
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 leading-tight mb-6">
            Do you know the service history of your car?
          </h1>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-10 leading-relaxed max-w-lg">
            AutoLog provides full insight into service and repair history, regardless of where the work is done. It gives you better insight that the work is carried out and documented correctly, which ensures you as a car owner fewer problems and the longest possible lifetime of your car. It is <strong className="font-bold">easy</strong> for car owners to get started.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/about')} 
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 px-8 py-3 rounded-xl font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              Learn more <span>›</span>
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all flex items-center gap-2"
            >
              Register your car <span>›</span>
            </button>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-[60vh] animate-slide-up pl-0 lg:pl-8">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Using a reliable placeholder car image from Unsplash to make it look nice */}
            <img 
              src={homeImage} 
              alt="Happy person driving a car" 
              className="w-full h-full object-cover"
            />
            {/* Soft overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

      </main>

      {/* Services & About Section */}
      <section className="w-full bg-white dark:bg-slate-800 py-16 lg:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* About Us Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-slate-700 dark:to-slate-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400 mb-4">About AutoLog</h2>
              <p className="text-emerald-800 dark:text-slate-300 mb-6 leading-relaxed">
                Learn how AutoLog helps thousands of car owners keep track of their complete vehicle service history with transparent, organized documentation.
              </p>
              <button 
                onClick={() => navigate('/about')}
                className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 dark:hover:text-emerald-300 font-bold flex items-center gap-2 transition-colors text-lg"
              >
                Discover Our Story <span>›</span>
              </button>
            </div>

            {/* Services Card */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-700 dark:to-slate-800 p-10 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-400 mb-4">Our Services</h2>
              <p className="text-blue-800 dark:text-slate-300 mb-6 leading-relaxed">
                Explore the comprehensive features AutoLog offers including maintenance tracking, expense monitoring, warranty management, and more.
              </p>
              <button 
                onClick={() => navigate('/services')}
                className="text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 font-bold flex items-center gap-2 transition-colors text-lg"
              >
                Explore Services <span>›</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
