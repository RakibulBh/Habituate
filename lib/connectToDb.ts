import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
  } catch (error) {
    console.log(error);
  }
}

export default connectToDb;
