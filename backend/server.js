import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/*
=========================================
 FIREBASE SETUP INSTRUCTIONS FOR DATABASE
=========================================
To connect your actual Firebase Realtime Database:
1. Go to your Firebase Console (console.firebase.google.com).
2. Create a project and enable "Realtime Database" (Start in Test Mode).
3. Get your "SDK configuration" keys.
4. Open the `backend/.env` file and paste your keys there.
   (Make sure to include VITE_FIREBASE_DATABASE_URL).
=========================================
*/

// Helper to get the Database URL
const getDbUrl = () => {
  const url = process.env.VITE_FIREBASE_DATABASE_URL || process.env.FIREBASE_DATABASE_URL;
  if (!url) {
    throw new Error("FIREBASE DATABASE URL IS MISSING! Please check your .env file.");
  }
  return url;
};

// Get Vehicles
app.get('/api/vehicles', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: "userId is required" });
  
  try {
    const response = await fetch(`${getDbUrl()}/vehicles.json`);
    const data = await response.json();
    
    if (data && !data.error) {
      const vehicles = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .filter(v => v.userId === userId);
      res.json(vehicles);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Add Vehicle
app.post('/api/vehicles', async (req, res) => {
  try {
    const response = await fetch(`${getDbUrl()}/vehicles.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    res.status(201).json({ id: data.name, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
  try {
    await fetch(`${getDbUrl()}/vehicles/${req.params.id}.json`, { method: 'DELETE' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Logs
app.get('/api/vehicles/:vehicleId/logs', async (req, res) => {
  try {
    const response = await fetch(`${getDbUrl()}/logs.json`);
    const data = await response.json();
    
    if (data && !data.error) {
      const logs = Object.keys(data)
        .map(key => ({ id: key, ...data[key] }))
        .filter(l => l.vehicleId === req.params.vehicleId);
      res.json(logs);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Log
app.post('/api/vehicles/:vehicleId/logs', async (req, res) => {
  try {
    const logData = { ...req.body, vehicleId: req.params.vehicleId };
    const response = await fetch(`${getDbUrl()}/logs.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(logData)
    });
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    res.status(201).json({ id: data.name, ...logData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Log
app.put('/api/logs/:id', async (req, res) => {
  try {
    await fetch(`${getDbUrl()}/logs/${req.params.id}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Log
app.delete('/api/logs/:id', async (req, res) => {
  try {
    await fetch(`${getDbUrl()}/logs/${req.params.id}.json`, { method: 'DELETE' });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Profile
app.get('/api/users/:uid', async (req, res) => {
  try {
    const response = await fetch(`${getDbUrl()}/users/${req.params.uid}.json`);
    if (!response.ok) throw new Error(await response.text());
    const data = await response.json();
    res.json(data || {});
  } catch (error) {
    console.error("GET User Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Update User Profile
app.put('/api/users/:uid', async (req, res) => {
  try {
    console.log("Saving user:", req.params.uid, req.body);
    const response = await fetch(`${getDbUrl()}/users/${req.params.uid}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    if (!response.ok) throw new Error(await response.text());
    res.sendStatus(204);
  } catch (error) {
    console.error("PUT User Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
