"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import DaySelector from "./day-selector";
import { useAuth } from "@clerk/nextjs";
import { createHabit } from "@/app/dashboard/_actions";
import toast from "react-hot-toast";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formSchema = z.object({
  habitName: z.string().min(2).max(50),
  habitDescription: z.string().min(2).max(100),
  habitFrequency: z.array(z.string().min(1)),
  habitTime: z.string(),
});

export const AddHabitDialog = () => {
  const { userId } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habitName: "",
      habitDescription: "",
      habitFrequency: [],
      habitTime: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    try {
      await createHabit({
        clerkUserID: userId,
        habitName: values.habitName,
        habitDescription: values.habitDescription,
        habitFrequency: values.habitFrequency,
        time: values.habitTime,
      });
      toast.success("Habit created successfully");
    } catch (error) {
      console.error("Error creating habit:", error);
    }
  };

  const toggleDay = (day: string) => {
    const currentFrequency = form.getValues("habitFrequency");
    const updatedFrequency = currentFrequency.includes(day)
      ? currentFrequency.filter((d) => d !== day)
      : [...currentFrequency, day];
    form.setValue("habitFrequency", updatedFrequency);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary text-tertiary hover:bg-tertiary hover:text-secondary transition-all ease-in-out duration-500">
          Add habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className=" text-primary">
          <DialogTitle>Add a habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="habitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Habit title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Meditate"
                      className="border-primary focus:ring-primary focus:border-primary text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the habit you want to track
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habitDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Meditate every Wednesday..."
                      className="border-primary focus:ring-primary focus:border-primary text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe the habit you want to track
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habitFrequency"
              render={() => (
                <FormItem>
                  <FormLabel className="text-primary">Repeat</FormLabel>
                  <DaySelector
                    selectedDays={form.getValues("habitFrequency")}
                    toggleDay={toggleDay}
                  />
                  <FormDescription>
                    How often to repeat the habit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="habitTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary">Time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className="border-primary focus:ring-primary focus:ring-2 focus:border-primary text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Set the time for the habit</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-tertiary text-secondary hover:bg-primary hover:text-white"
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
            >
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
