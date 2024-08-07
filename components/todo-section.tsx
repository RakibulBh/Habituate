"use client";
import React from "react";
import TodoItem from "./todo-item";
import { useQuery } from "@tanstack/react-query";
import { getTodos, getTodosByDate } from "@/app/todos/actions";
import { useUser } from "@clerk/nextjs";
import { useDateStore } from "@/store/date";
import { Badge } from "./ui/badge";
import Skeleton from "react-loading-skeleton";

//TODO: makes this a todo section instead, show all user todo's

const SimpleTodo = ({
  title,
  description,
  priority,
}: {
  title: string;
  description: string;
  priority: string;
}) => {
  const priorityColor =
    {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }[priority] || "bg-gray-100 text-gray-800";

  return (
    <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        </div>
        <Badge className={`${priorityColor} capitalize text-xs`}>
          {priority}
        </Badge>
      </div>
    </div>
  );
};

const TodoSection = () => {
  const date = useDateStore((state) => state.date);

  const { user } = useUser();

  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos", user?.id, date.currentDate],
    queryFn: () =>
      getTodosByDate({
        clerkUserId: user!.id,
        date: new Date(date.currentDate).toISOString(),
      }),
    enabled: !!user,
  });

  return (
    <>
      <h1 className="font-light text-gray-500 text-md md:text-2xl">
        Today&apos;s todos
      </h1>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {!isLoading && !error && todos && todos.length === 0 && (
          <p className="text-center text-gray-600">
            No todos available for today.
          </p>
        )}
        {isLoading && <Skeleton height="5rem" count={2} />}
        {!isLoading &&
          !error &&
          todos &&
          Array.isArray(todos) &&
          todos.map((todo: any) => (
            <SimpleTodo
              key={todo._id}
              title={todo.title}
              description={todo.description}
              priority={todo.priority}
            />
          ))}
      </div>
    </>
  );
};

export default TodoSection;
