import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { vehicleService } from '../services/db';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const { user } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(() => {
    if (!user) return;
    setLoading(true);
    vehicleService.getVehicles(user.uid, (data, error) => {
      if (!error) setVehicles(data);
      setLoading(false);
    });
  }, [user]);

  useEffect(() => {
    if (!user) {
      setVehicles([]);
      setLoading(false);
      return;
    }
    fetchVehicles();
  }, [user, fetchVehicles]);

  const addVehicle = async (data) => {
    if (!user) return;
    await vehicleService.addVehicle({ ...data, userId: user.uid });
    fetchVehicles(); // Refresh the list
  };

  const deleteVehicle = async (id) => {
    // Optimistic UI update: remove instantly from the screen
    setVehicles(prev => prev.filter(v => v.id !== id));
    try {
      await vehicleService.deleteVehicle(id);
    } catch (e) {
      console.error('Failed to delete, reverting...');
      fetchVehicles(); // Refresh the list if it fails
    }
  };

  return (
    <VehicleContext.Provider value={{ vehicles, loading, addVehicle, deleteVehicle, refreshVehicles: fetchVehicles }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => useContext(VehicleContext);
