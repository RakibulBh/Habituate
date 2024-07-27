"use server";

import Todo from "@/models/TodoSchema";
import User from "@/models/UserSchema";
import { revalidatePath } from "next/cache";

const findUserByClerkId = async (clerkUserID: string) => {
  const user = await User.findOne({ clerkUserID });
  if (!user) throw new Error("User not found");
  return user;
};

export const deleteTodo = async (todoId: string, clerkUserId: string) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    await Todo.findOneAndDelete({ _id: todoId, userId: user._id });
    revalidatePath("/todos");
    return { message: "Todo deleted successfully" };
  } catch (error) {
    console.error("Failed to delete todo:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to delete todo" };
  }
};

export const getTodos = async ({ clerkUserId }: { clerkUserId: string }) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const todos = await Todo.find({ userId: user._id });
    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to get todos:", error);
    return { error: "Failed to get todos" };
  }
};

export const getTodosByDate = async ({
  clerkUserId,
  date,
}: {
  clerkUserId: string;
  date: string;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    console.log("Date received:", date);

    // Create the date range for the given day in local time
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    console.log("Querying for todos between:", startOfDay, "and", endOfDay);

    const todos = await Todo.find({
      userId: user._id,
      due: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    console.log("Todos found:", todos.length);

    return JSON.parse(JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to get todos:", error);
    return { error: "Failed to get todos" };
  }
};

export const addTodo = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dueDate = formData.get("dueDate") as string;
    const priority = formData.get("priority") as string;
    const clerkUserID = formData.get("clerkUserID") as string;

    const user = await findUserByClerkId(clerkUserID);

    // Parse the dueDate and set it to the start of the day in local time
    const parsedDueDate = new Date(dueDate);
    parsedDueDate.setHours(0, 0, 0, 0);

    const newTodo = new Todo({
      userId: user._id,
      title,
      description,
      due: parsedDueDate,
      priority,
    });

    await newTodo.save();

    revalidatePath("/todos");
    return { message: "Todo added successfully" };
  } catch (error) {
    console.error("Failed to add todo:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to add todo" };
  }
};
