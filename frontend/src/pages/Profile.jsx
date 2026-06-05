import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaEnvelope, FaIdBadge, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="w-32 h-32 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center text-6xl shadow-inner">
          <FaUserCircle />
        </div>
        
        <div className="flex-1 space-y-4 w-full">
          <div>
            <p className="text-lg font-semibold">{user.firstName || ''} {user.lastName || ''}</p>
            <p className="text-sm text-slate-500">Personal details saved at signup</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2 mb-1">
              <FaEnvelope /> Email Address
            </label>
            <p className="text-xl font-medium">{user.email || 'No email provided'}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2 mb-1">
              <FaPhone /> Phone Number
            </label>
            <p className="text-lg">{user.phone || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2 mb-1">
              <FaMapMarkerAlt /> Address
            </label>
            <p className="text-lg">{user.address || 'Not provided'}</p>
          </div>
          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-2 mb-1">
              <FaIdBadge /> User ID
            </label>
            <p className="text-sm font-mono bg-slate-800/50 p-2 rounded-lg break-all">
              {user.uid}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
