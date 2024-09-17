import Mongoose from 'mongoose';

const localDB = `mongodb://localhost:27017/auth`;

const connectDB = async () => {
  try {
    await Mongoose.connect(localDB);

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;