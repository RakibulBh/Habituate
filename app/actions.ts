"use server";

import { IHabit } from "@/types";
import { MongoClient } from "mongodb";

export default async function createHabit({
  name,
  frequency,
  end,
  days,
  color,
}: IHabit) {
  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();

    // Choose a name for your database
    const database = client.db("user_habits");

    // Choose a name for your collection
    const collection = database.collection("habits");

    await collection.insertOne({ name, frequency, end, days, color });
  } catch (error) {
    console.log({ message: "Something went wrong!" });
  } finally {
    await client.close();
  }
}
