"use client";

import { Pencil, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addTodo, deleteTodo, getTodos } from "./actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  priority: z.enum(["low", "medium", "high"]),
  description: z.string().min(10).max(200),
  dueDate: z.date(),
});

function Todos() {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos", user?.id],
    queryFn: () => getTodos({ clerkUserId: user!.id }),
    enabled: !!user,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      priority: "low",
      description: "",
      dueDate: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("dueDate", values.dueDate.toISOString());
      formData.append("priority", values.priority);
      formData.append("clerkUserID", user.id);

      const result = await addTodo(formData);

      if ("error" in result) {
        toast.error("Failed to add todo");
      } else {
        form.reset();
        toast.success("Scheduled todo successfully");
        queryClient.invalidateQueries({ queryKey: ["todos", user.id] });
      }
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <section className="mx-4 sm:mx-6 md:mx-10 py-4 sm:py-6 md:py-8 flex flex-col gap-y-4 sm:gap-y-6">
      <div className="space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold">My Todo&apos;s</h1>
        <p className="text-sm sm:text-base text-gray-400">
          Manage and track all your todos here.
        </p>
      </div>
      <div className="bg-white rounded-md px-3 sm:px-4 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border-none"
                      placeholder="E.g, Renew gym every May 1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="border-none"
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-x-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full sm:w-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full sm:w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full sm:w-auto">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full sm:w-[180px]">
                          <SelectValue placeholder="Priority type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Priority</SelectLabel>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-auto">
                Add todo
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="h-[calc(100vh-400px)] sm:h-80 bg-white rounded-xl px-3 sm:px-4 py-2 overflow-y-auto">
        {isLoading && <p>Loading todos...</p>}
        {error && <p>Error loading todos: {(error as Error).message}</p>}
        {!isLoading &&
          !error &&
          todos &&
          Array.isArray(todos) &&
          todos.map((todo: any) => (
            <Todo
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
              dueDate={new Date(todo.due)}
              priority={todo.priority}
              clerkUserId={user!.id}
            />
          ))}
      </div>
    </section>
  );
}

function Todo({
  id,
  title,
  description,
  dueDate,
  priority,
  clerkUserId,
}: {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  clerkUserId: string;
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(id, clerkUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos", clerkUserId] });
    },
  });

  const handleCheckboxChange = () => {
    deleteMutation.mutate();
  };

  const priorityColor =
    {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
    }[priority] || "bg-gray-100 text-gray-800";

  return (
    <div className="mb-4 p-3 sm:p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          <Checkbox id={`todo-${id}`} onCheckedChange={handleCheckboxChange} />
          <div>
            <label
              htmlFor={`todo-${id}`}
              className="text-base sm:text-lg font-semibold text-gray-700 cursor-pointer"
            >
              {title}
            </label>
            <p className="text-xs sm:text-sm text-gray-500">{description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className={`${priorityColor} capitalize text-xs sm:text-sm`}>
            {priority}
          </Badge>
          <div className="flex items-center text-xs sm:text-sm text-gray-500">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            {format(dueDate, "MMM d, yyyy")}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
        >
          <Pencil className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Todos;
