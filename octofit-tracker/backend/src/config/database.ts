import mongoose from 'mongoose';

const db = mongoose.connection;

export async function connectDatabase(): Promise<void> {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');
}

export default db;
