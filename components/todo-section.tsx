import React from "react";
import TodoItem from "./todo-item";

//TODO: makes this a todo section instead, show all user todo's

const TodoSection = () => {
  return (
    <>
      <h1 className="font-light text-gray-500 text-md md:text-2xl">
        Today's todos
      </h1>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </>
  );
};

export default TodoSection;
