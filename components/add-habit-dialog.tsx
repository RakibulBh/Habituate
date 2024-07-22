"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import DaySelector from "./day-selector";
import { createHabit } from "@/app/home/_actions";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { MongooseError } from "mongoose";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { revalidatePath } from "next/cache";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  color: z.string().min(7).max(7),
  description: z.string().min(5).max(100),
  repeat: z.array(z.string().min(1)),
  frequency: z.preprocess((val) => Number(val), z.number()),
  unit: z.string(),
  time: z.string(),
});

const AddHabitDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      color: "#000000",
      description: "",
      repeat: [],
      frequency: 0,
      unit: "",
      time: "",
    },
  });

  const toggleDay = (day: string) => {
    const currentFrequency = form.getValues("repeat");
    const updatedFrequency = currentFrequency.includes(day)
      ? currentFrequency.filter((d) => d !== day)
      : [...currentFrequency, day];
    form.setValue("repeat", updatedFrequency);
  };

  const selectedDays = form.watch("repeat");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    try {
      await createHabit({
        clerkUserID: user.id,
        ...values,
      });
      form.reset();
      toast.success("Habit created successfully");
      onOpenChange(false);
    } catch (error) {
      if (error instanceof MongooseError) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 w-full bg-[#A855F7]">
          + Add New Habit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex gap-x-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        className="w-60"
                        placeholder="Enter the title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input className="" type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter the description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repeat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat</FormLabel>
                  <FormControl>
                    <DaySelector
                      toggleDay={toggleDay}
                      selectedDays={selectedDays}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Frequency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="times">Times</SelectItem>
                          <SelectItem value="pages">Pages</SelectItem>
                          <SelectItem value="L">Litres</SelectItem>
                          <SelectItem value="Ml">Millilitres</SelectItem>
                          <SelectItem value="M">Meters</SelectItem>
                          <SelectItem value="Km">Kilometres</SelectItem>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="Time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
