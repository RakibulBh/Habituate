import React from "react";
import { Input } from "./ui/input";
import { Trash } from "lucide-react";

const TodoItem = () => {
  return (
    <div className="flex h-20 justify-between items-center bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-x-2">
        <Input type="checkbox" />
        <p className="">Do this</p>
      </div>
      <button className="text-red-500 hover:text-red-700">
        <Trash size={24} />
      </button>
    </div>
  );
};

export default TodoItem;
