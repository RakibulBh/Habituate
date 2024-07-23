import React from "react";
import { Input } from "./ui/input";

const TodoItem = () => {
  return (
    <div className="flex h-16 justify-between items-center bg-gray-100 px-4 rounded-lg shadow">
      <div className="flex items-center gap-x-2">
        <Input className="w-5 h-5 rounded-full" type="checkbox" />
        <p className="">Do this</p>
      </div>
      <div className="px-4 py-1 bg-red-400 text-white rounded-md">High</div>
    </div>
  );
};

export default TodoItem;
