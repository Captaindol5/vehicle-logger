import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicles } from '../context/VehicleContext';
import { FaPlus, FaCarSide, FaArrowLeft, FaSpinner } from 'react-icons/fa';

export default function AddVehicle() {
  const { addVehicle } = useVehicles();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [photoBase64, setPhotoBase64] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB max upload size

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setError('Image size must be 5MB or smaller. Please choose a smaller file.');
      setPhotoBase64('');
      e.target.value = null;
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await addVehicle({
        make,
        model,
        year,
        mileage: Number(mileage),
        numberPlate,
        photoBase64,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error('Add vehicle failed:', err);
      setError(err?.message || 'Unable to save vehicle. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      {!showForm ? (
        <div className="glass-card w-full max-w-xl p-10 text-center">
          <div className="flex items-center justify-center mb-8 text-emerald-500">
            <FaCarSide className="text-5xl" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Add your vehicle</h1>
          <p className="text-slate-500 mb-8">Click below to open the add vehicle form and save your car to the garage.</p>
          <button onClick={() => setShowForm(true)} className="btn btn-primary px-10 py-4 inline-flex items-center gap-3">
            <FaPlus /> Add your vehicle
          </button>
        </div>
      ) : (
        <div className="glass-card w-full max-w-3xl p-8 space-y-6">
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700"
          >
            <FaArrowLeft /> Back
          </button>
          <div>
            <h1 className="text-3xl font-bold mb-2">Save vehicle to garage</h1>
            <p className="text-slate-500">Fill in the details below and click save to add this vehicle to your garage.</p>
          </div>

          {error && (
            <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-100 p-4 space-y-3">
              <p>{error}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setError('')}
                  className="btn btn-secondary px-4 py-2"
                >
                  Try again
                </button>
                <span className="text-slate-300">Or fix the details and save again.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">Make</label>
              <input
                required
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="e.g. Toyota"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Model</label>
              <input
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Corolla"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Year</label>
              <input
                required
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g. 2020"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Mileage</label>
              <input
                required
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="e.g. 45000"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Number Plate</label>
              <input
                required
                value={numberPlate}
                onChange={(e) => setNumberPlate(e.target.value)}
                placeholder="e.g. ABC-1234"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Upload a photo (optional)</label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-colors">
                  Choose image
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {photoBase64 && <span className="text-emerald-500">Image selected</span>}
              </div>
              {photoBase64 && <img src={photoBase64} alt="Preview" className="mt-4 rounded-2xl h-36 w-full object-cover" />}
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="btn btn-primary w-full py-3 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={saving}
              >
                {saving ? (
                  <span className="inline-flex items-center gap-2">
                    <FaSpinner className="animate-spin" /> Saving...
                  </span>
                ) : 'Save Vehicle to Garage'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
