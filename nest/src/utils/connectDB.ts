import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const url = process.env.DATABASE_URL as string;
    mongoose.connect(url);
    console.log('Database Connected');
  } catch (error) {
    console.log('Database Fail', error);
  }
};
