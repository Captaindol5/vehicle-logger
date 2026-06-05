import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserPlus, FaHome } from 'react-icons/fa';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, { firstName, lastName, phone, address });
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
      <div className="glass-card w-full max-w-lg p-8 animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-3xl mb-4">
            <FaUserPlus />
          </div>
          <h1 className="text-2xl font-bold text-center">Create Account</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">Sign up with your details to use your profile across the app.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 ml-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 ml-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="012-345-6789"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="123 Main St, City"
            />
          </div>
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
          <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full mt-2 py-3">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Already have an account? <span className="text-emerald-500 font-bold cursor-pointer hover:underline" onClick={() => navigate('/login')}>Log in here</span>
        </p>
      </div>
    </div>
  );
}
