import mongoose from "mongoose";

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("db connected...");
  } catch (error) {
    console.log(error);
  }
}

export default connectToDb;
