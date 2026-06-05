import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { vehicleService } from '../services/db';
import configData from '../data/config.json';
import { FaArrowLeft, FaFileInvoice } from 'react-icons/fa';

export default function AddLog() {
  const { id: vehicleId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editLogId = searchParams.get('edit');

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [serviceType, setServiceType] = useState(configData.serviceTypes[0]);
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');
  const [billImage, setBillImage] = useState('');
  const [error, setError] = useState('');
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB max upload size

  useEffect(() => {
    if (editLogId) {
      // Fetch the log to edit
      vehicleService.getLogs(vehicleId, (logs) => {
        const log = logs.find(l => l.id === editLogId);
        if (log) {
          setDate(log.date);
          setServiceType(log.serviceType);
          setCost(log.cost.toString());
          setNotes(log.notes || '');
          setBillImage(log.billImage || '');
        }
      });
    }
  }, [editLogId, vehicleId]);

  // Handle Bill Image Upload and convert to Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError('Image size must be 5MB or smaller. Please choose a smaller file.');
      setBillImage('');
      e.target.value = null;
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setBillImage(reader.result); // Base64 string of the bill
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logData = {
      vehicleId,
      date,
      serviceType,
      cost: Number(cost),
      notes,
      billImage
    };
    
    // Web Notifications Device Capability Requirement
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Vehicle Logger', { body: `Service document ${editLogId ? 'updated' : 'added'} successfully!` });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Vehicle Logger', { body: `Service document ${editLogId ? 'updated' : 'added'} successfully!` });
          }
        });
      }
    }

    if (editLogId) {
      await vehicleService.updateLog(editLogId, logData);
    } else {
      await vehicleService.addLog(logData);
    }
    navigate(`/vehicle/${vehicleId}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-700/50 text-slate-400 focus:outline-none">
          <FaArrowLeft />
        </button>
        <h1 className="text-3xl font-bold">{editLogId ? 'Edit Service Record' : 'Add New Service Document'}</h1>
      </div>

      {error && (
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-100 p-4">
          <p>{error}</p>
        </div>
      )}

      <div className="glass-card p-6 border border-emerald-500/20 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Date of Service</label>
              <input type="date" required value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">Service Category</label>
              <select required value={serviceType} onChange={e=>setServiceType(e.target.value)}>
                {configData.serviceTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Total Cost ($)</label>
            <input type="number" required value={cost} onChange={e=>setCost(e.target.value)} placeholder="0.00" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">Notes (Optional)</label>
            <textarea rows="3" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Mechanic details, specific parts used, mileage at service..."></textarea>
          </div>

          {/* Bill Image Upload Section */}
          <div className="border border-dashed border-slate-600 rounded-xl p-4 bg-slate-800/50">
            <label className="block text-sm font-medium mb-2 text-emerald-400 flex items-center gap-2">
              <FaFileInvoice /> Attach Bill / Invoice / Receipt (Optional)
            </label>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <label className="cursor-pointer bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold">
                Select Document Image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {billImage && <span className="text-emerald-500 text-sm font-semibold">Document attached successfully!</span>}
            </div>
            {billImage && (
              <div className="mt-4 border border-slate-700 rounded-xl overflow-hidden inline-block">
                <img src={billImage} alt="Bill Preview" className="h-40 w-auto object-cover" />
              </div>
            )}
          </div>
          
          <button type="submit" className="btn btn-primary w-full py-4 text-lg mt-4 shadow-lg shadow-emerald-500/20">
            {editLogId ? 'Update Record' : 'Save Document to Vehicle History'}
          </button>
        </form>
      </div>
    </div>
  );
}
