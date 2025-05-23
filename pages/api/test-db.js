// pages/api/test-db.js
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    await connectDB();
    // Try to get the connection status
    const connectionState = mongoose.connection.readyState;
    const connectionStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting',
    };

    // Try to fetch one user to verify database access
    const userCount = await User.countDocuments();

    res.status(200).json({ 
      connected: connectionState === 1,
      status: connectionStatus[connectionState],
      userCount
    });
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ 
      connected: false, 
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
}
