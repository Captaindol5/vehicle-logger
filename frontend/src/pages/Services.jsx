import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaCarSide } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Services() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const services = [
    {
      title: 'Maintenance Tracking',
      description: 'Log oil changes, tire rotations, filter replacements, and other routine maintenance tasks with dates and mileage.'
    },
    {
      title: 'Repair History',
      description: 'Keep detailed records of all repairs performed on your vehicle, including costs and parts replaced.'
    },
    {
      title: 'Service Reminders',
      description: 'Get notified when routine maintenance is due based on time intervals or mileage thresholds.'
    },
    {
      title: 'Expense Tracking',
      description: 'Monitor your vehicle maintenance spending and view detailed cost breakdowns over time.'
    },
    {
      title: 'Multi-Vehicle Support',
      description: 'Manage maintenance records for multiple vehicles all in one convenient platform.'
    },
    {
      title: 'Warranty Management',
      description: 'Track warranty periods and ensure all maintenance is properly documented to maintain coverage.'
    },
    {
      title: 'Export Records',
      description: 'Export your maintenance history for insurance claims, resale purposes, or warranty verification.'
    },
    {
      title: 'Mobile Access',
      description: 'Access your vehicle records anytime, anywhere from any device with secure authentication.'
    }
  ];

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
            className="text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold transition-colors"
          >
            About Us
          </button>
          <button 
            onClick={() => navigate('/services')} 
            className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors border-b-2 border-emerald-600 dark:border-emerald-400 pb-1"
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
        
        {/* Header Section */}
        <section className="mb-16 text-center animate-fade-in">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-emerald-700 dark:text-emerald-400">
            Our Services
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto">
            AutoLog provides comprehensive vehicle maintenance management tools to keep your car in optimal condition and maintain complete documentation.
          </p>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-emerald-700 dark:text-emerald-400">
                  {service.title}
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-lg transition-colors duration-300">
          <h2 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">Key Features</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-emerald-600 dark:text-emerald-400">✓</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Comprehensive Documentation</h3>
                <p className="text-slate-700 dark:text-slate-300">Capture every detail of your vehicle maintenance with photo uploads, notes, and service provider information.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl text-emerald-600 dark:text-emerald-400">✓</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Predictive Maintenance</h3>
                <p className="text-slate-700 dark:text-slate-300">Receive intelligent recommendations for upcoming maintenance based on your vehicle's history and manufacturer guidelines.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl text-emerald-600 dark:text-emerald-400">✓</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Financial Insights</h3>
                <p className="text-slate-700 dark:text-slate-300">Track spending patterns and identify cost-saving opportunities in your vehicle maintenance budget.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="text-2xl text-emerald-600 dark:text-emerald-400">✓</div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">Resale Value Protection</h3>
                <p className="text-slate-700 dark:text-slate-300">Maintain complete service records to demonstrate proper maintenance and increase your vehicle's resale value.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-12 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">Experience AutoLog Today</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Start managing your vehicle maintenance professionally. Sign up now and get your first vehicle registered for free!</p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-white hover:bg-slate-100 text-emerald-700 px-10 py-4 rounded-xl font-bold text-lg transition-colors shadow-lg"
          >
            Get Started
          </button>
        </section>
      </main>
    </div>
  );
}
