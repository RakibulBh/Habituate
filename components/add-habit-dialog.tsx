"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
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
import EmojiPicker from "emoji-picker-react";

const colorOptions = [
  { value: "#FF5733", label: "Red" },
  { value: "#33FF57", label: "Green" },
  { value: "#3357FF", label: "Blue" },
  { value: "#FFFF33", label: "Yellow" },
  { value: "#FF33FF", label: "Purple" },
];

const formSchema = z.object({
  title: z.string().min(2).max(50),
  emoji: z.string().min(1).max(2),
  color: z.string().length(7),
  description: z.string().min(5).max(100),
  repeat: z.array(z.string().min(1)),
  frequency: z.preprocess((val) => Number(val), z.number().min(1)),
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      emoji: "😊",
      color: "#FF5733",
      description: "",
      repeat: [],
      frequency: 1,
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
        <Button className="px-4 py-2 w-full bg-[#A855F7] hover:bg-[#9333EA]">
          + Add New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Button
                          type="button"
                          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                          className="w-10 h-10 text-2xl"
                        >
                          {field.value}
                        </Button>
                        {showEmojiPicker && (
                          <div className="absolute z-10 mt-1">
                            <EmojiPicker
                              onEmojiClick={(emojiObject) => {
                                field.onChange(emojiObject.emoji);
                                setShowEmojiPicker(false);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {colorOptions.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: color.value }}
                              />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                  <FormItem className="flex-1">
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
                  <FormItem className="flex-1">
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
            <Button
              type="submit"
              className="w-full bg-[#A855F7] hover:bg-[#9333EA]"
            >
              Create Habit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
