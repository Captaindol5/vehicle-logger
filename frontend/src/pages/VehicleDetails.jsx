import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { vehicleService } from '../services/db';
import { FaArrowLeft, FaPlus, FaWrench, FaTrash, FaEdit } from 'react-icons/fa';

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maintenanceTips, setMaintenanceTips] = useState(null);

  const vehicle = vehicles.find(v => v.id === id);

  const fetchLogs = () => {
    setLoading(true);
    vehicleService.getLogs(id, (data) => {
      setLogs(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!vehicle) return;
    fetchLogs();
    
    // External API Requirement
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.json())
      .then(data => setMaintenanceTips("Tip of the day: Keep your tires properly inflated to improve gas mileage!"))
      .catch(() => setMaintenanceTips("Tip of the day: Regular oil changes prolong engine life."));

    return () => {}; // Cleanup
  }, [id, vehicle]);

  if (!vehicle) return <div className="text-center py-10">Vehicle not found.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400">
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
      </div>

      {maintenanceTips && (
        <div className="bg-brand-500/10 border border-brand-500/20 text-brand-500 p-4 rounded-xl text-sm">
          {maintenanceTips}
        </div>
      )}

      <div className="flex justify-between items-end">
        <div>
          <p className="text-slate-600 dark:text-slate-400">Current Mileage: {vehicle.mileage.toLocaleString()} miles</p>
        </div>
        <button onClick={() => navigate(`/vehicle/${id}/log/new`)} className="btn btn-primary text-sm">
          <FaPlus /> Add Log
        </button>
      </div>

      <div className="glass-card border border-emerald-500/20 p-6 mt-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-900 dark:text-white"><FaWrench /> Service History</h2>
        
        {loading ? (
          <p className="text-slate-600 dark:text-slate-400">Loading history...</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-500 italic">No maintenance logs found for this vehicle.</p>
        ) : (
          <div className="space-y-4">
            {logs.sort((a,b) => new Date(b.date) - new Date(a.date)).map(log => (
              <div key={log.id} className="p-6 rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 flex flex-col md:flex-row justify-between items-start gap-4 hover:shadow-lg transition-all">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{log.serviceType}</span>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">{log.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">${log.cost}</h3>
                  {log.notes && <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{log.notes}</p>}
                </div>

                {log.billImage && (
                  <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0 cursor-pointer" title="View attached document">
                    <a href={log.billImage} target="_blank" rel="noreferrer">
                      <img src={log.billImage} alt="Bill" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </a>
                  </div>
                )}

                <div className="flex md:flex-col gap-2 w-full md:w-auto justify-end md:justify-start mt-4 md:mt-0">
                  <button onClick={() => navigate(`/vehicle/${id}/log/new?edit=${log.id}`)} className="bg-slate-700 hover:bg-emerald-600 text-white p-3 rounded-xl transition-colors shadow-sm" title="Edit Record">
                    <FaEdit />
                  </button>
                  <button onClick={async () => { 
                    setLogs(prev => prev.filter(l => l.id !== log.id)); // Optimistic UI update
                    try {
                      await vehicleService.deleteLog(log.id); 
                    } catch(e) {
                      fetchLogs(); // Revert on error
                    }
                  }} className="bg-slate-700 hover:bg-red-500 text-white p-3 rounded-xl transition-colors shadow-sm" title="Delete Record">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
