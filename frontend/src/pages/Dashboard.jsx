import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { useAuth } from '../context/AuthContext';
import { FaCarSide, FaTrash } from 'react-icons/fa';

export default function Dashboard() {
  const { user } = useAuth();
  const { vehicles, loading, deleteVehicle } = useVehicles();
  const navigate = useNavigate();

  if (loading) return <div className="text-center py-10">Loading your garage...</div>;

  return (
    <div className="space-y-6">
      <div className="glass-card border border-emerald-500/20 p-6 shadow-lg shadow-emerald-500/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-500 font-semibold">Welcome to your garage</p>
            <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">
              {user?.firstName ? `Welcome ${user.firstName}.` : 'Welcome back.'}
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300 text-lg">
              This is your personal garage. Add vehicles, track service history, and manage your ride with confidence.
            </p>
          </div>
          <div className="rounded-full bg-white/90 dark:bg-slate-800/80 px-5 py-3 text-emerald-700 dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-slate-700 text-sm font-semibold">
            {vehicles.length} {vehicles.length === 1 ? 'vehicle' : 'vehicles'} in your garage
          </div>
        </div>
      </div>

      {vehicles.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-slate-800/10 rounded-3xl border border-dashed border-slate-400">
          <FaCarSide className="text-6xl mx-auto mb-4 opacity-40" />
          <h2 className="text-2xl font-semibold mb-2">No vehicles in your garage yet</h2>
          <p className="text-sm opacity-70">Add a vehicle to begin tracking service history.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => (
            <div key={v.id} className="glass-card flex flex-col hover:shadow-2xl transition-all cursor-pointer group overflow-hidden" onClick={() => navigate(`/vehicle/${v.id}`)}>
              <div className="h-48 w-full bg-slate-800 relative">
                {v.photoBase64 ? (
                  <img src={v.photoBase64} alt={`${v.make} ${v.model}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
                    <FaCarSide className="text-5xl mb-2" />
                    <span className="text-xs">No image available</span>
                  </div>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteVehicle(v.id); }}
                  className="absolute top-3 right-3 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full transition-opacity opacity-0 group-hover:opacity-100"
                  title="Delete Vehicle"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-500">{v.year} {v.make} {v.model}</h3>
                </div>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <p><span className="font-semibold text-slate-800 dark:text-slate-300">Plate:</span> {v.numberPlate || 'N/A'}</p>
                  <p><span className="font-semibold text-slate-800 dark:text-slate-300">Mileage:</span> {v.mileage.toLocaleString()} miles</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
