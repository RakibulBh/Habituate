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

export const getTodosByDay = async ({
  clerkUserId,
  date,
}: {
  clerkUserId: string;
  date: Date;
}) => {
  try {
    const user = await findUserByClerkId(clerkUserId);
    const todos = await Todo.find({ userId: user._id, due: date });
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

    const newTodo = new Todo({
      userId: user._id,
      title,
      description,
      due: new Date(dueDate),
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
