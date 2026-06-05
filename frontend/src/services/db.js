const API_URL = 'http://localhost:5000/api';

const parseResponse = async (res) => {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const vehicleService = {
  getVehicles: (userId, callback) => {
    let isCancelled = false;

    fetch(`${API_URL}/vehicles?userId=${userId}`)
      .then(async (res) => {
        const data = await parseResponse(res);
        if (!res.ok) throw new Error(data?.error || data || `Failed to load vehicles (${res.status})`);
        return data;
      })
      .then((data) => {
        if (!isCancelled) callback(data, null);
      })
      .catch((err) => {
        if (!isCancelled) callback([], err);
      });

    // Return a mock unsubscribe function since fetch isn't real-time
    return () => { isCancelled = true; };
  },

  addVehicle: async (vehicleData) => {
    const res = await fetch(`${API_URL}/vehicles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vehicleData)
    });
    const data = await parseResponse(res);
    if (!res.ok) {
      throw new Error(data?.error || data?.message || data || `Failed to add vehicle (${res.status})`);
    }
    if (!data || !data.id) {
      throw new Error('Backend returned unexpected response while saving vehicle.');
    }
    return data.id;
  },

  deleteVehicle: async (id) => {
    await fetch(`${API_URL}/vehicles/${id}`, { method: 'DELETE' });
  },

  getLogs: (vehicleId, callback) => {
    let isCancelled = false;
    
    fetch(`${API_URL}/vehicles/${vehicleId}/logs`)
      .then(async (res) => {
        const data = await parseResponse(res);
        if (!res.ok) throw new Error(data?.error || data || `Failed to load logs (${res.status})`);
        return data;
      })
      .then((data) => {
        if (!isCancelled) callback(data, null);
      })
      .catch((err) => {
        if (!isCancelled) callback([], err);
      });

    return () => { isCancelled = true; };
  },

  addLog: async (logData) => {
    const res = await fetch(`${API_URL}/vehicles/${logData.vehicleId}/logs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
    const data = await parseResponse(res);
    if (!res.ok) {
      throw new Error(data?.error || data?.message || data || `Failed to add log (${res.status})`);
    }
    if (!data || !data.id) {
      throw new Error('Backend returned unexpected response while saving log.');
    }
    return data.id;
  },

  updateLog: async (id, logData) => {
    await fetch(`${API_URL}/logs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
  },

  deleteLog: async (id) => {
    await fetch(`${API_URL}/logs/${id}`, { method: 'DELETE' });
  }
};
