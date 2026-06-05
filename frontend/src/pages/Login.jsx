import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaCar, FaHome } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 p-3 rounded-full hover:bg-slate-700/50 transition-colors text-slate-400 hover:text-emerald-400"
        title="Go to Home"
      >
        <FaHome className="text-xl" />
      </button>
      <div className="glass-card w-full max-w-md p-8 animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-500/20 text-brand-500 rounded-full flex items-center justify-center text-3xl mb-4">
            <FaCar />
          </div>
          <h1 className="text-2xl font-bold text-center">LOGIN</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">Manage your vehicle maintenance effortlessly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-6 py-3">
            Sign In
          </button>
        </form>
        
        <p className="text-sm text-center mt-6">
          Don't have an account? <span className="text-emerald-500 font-bold cursor-pointer hover:underline" onClick={() => navigate('/signup')}>Sign up here</span>
        </p>
      </div>
    </div>
  );
}
