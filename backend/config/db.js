import mongoose from 'mongoose';
import dns from 'dns';

// Atlas SRV lookups can fail on some ISP/router DNS resolvers.
// Force public resolvers to keep development setup reliable.
dns.setServers(['1.1.1.1', '8.8.8.8']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
