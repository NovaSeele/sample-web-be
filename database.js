import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoConnect = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sample_web_be');

    console.log(`MongoDB Connected: ${mongoConnect.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
