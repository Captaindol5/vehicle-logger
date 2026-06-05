import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaCarSide } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import aboutUsImage from '../../images/aboutus.avif';

export default function AboutUs() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navigation */}
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
            className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors"
          >
            Home
          </button>
          <button 
            onClick={() => navigate('/about')} 
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors border-b-2 border-emerald-600 dark:border-emerald-400 pb-1"
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-8 lg:p-16">
        
        {/* About Us Section */}
        <section className="mb-16 animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold mb-8 text-emerald-700 dark:text-emerald-400">
            About AutoLog
          </h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                AutoLog is a comprehensive vehicle maintenance management platform designed to help car owners keep track of their vehicle's complete service and repair history. Whether maintenance is performed at a dealership, independent repair shop, or handled personally, AutoLog captures everything.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 mb-6 leading-relaxed">
                Our mission is to empower car owners with transparent, organized documentation of all vehicle maintenance activities. This ensures peace of mind, helps maintain warranty coverage, and extends the longevity of your vehicle.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                With AutoLog, you're never left wondering "When was the last oil change?" or "What maintenance has been completed?" Everything is stored securely and is accessible whenever you need it.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl h-96">
              <img 
                src={aboutUsImage} 
                alt="Mechanic working on a car" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold mb-12 text-slate-900 dark:text-slate-100">Why Choose AutoLog?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600 dark:text-emerald-400"></div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Complete History</h3>
              <p className="text-slate-700 dark:text-slate-300">Keep all your vehicle maintenance records in one secure location, accessible anytime you need them.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600 dark:text-emerald-400"></div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Secure & Private</h3>
              <p className="text-slate-700 dark:text-slate-300">Your data is encrypted and protected. Only you have access to your vehicle information and maintenance history.</p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4 text-emerald-600 dark:text-emerald-400"></div>
              <h3 className="text-2xl font-bold mb-4 text-emerald-700 dark:text-emerald-400">Easy to Use</h3>
              <p className="text-slate-700 dark:text-slate-300">Simple and intuitive interface that makes logging maintenance tasks quick and effortless.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of car owners who trust AutoLog to manage their vehicle maintenance. Get started today!</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-white hover:bg-slate-100 text-emerald-700 px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Register Your Car Now
          </button>
        </section>
      </main>
    </div>
  );
}
