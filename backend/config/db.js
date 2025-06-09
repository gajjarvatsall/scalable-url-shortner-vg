import mongoose from "mongoose"; 

// Function to connect to MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); 
    console.log("MongoDB connected"); 
  } catch (err) {
    console.error(err); 
    process.exit(1); 
  }
};
