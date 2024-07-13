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
import { createHabit } from "@/app/dashboard/_actions";
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

const formSchema = z.object({
  title: z.string().min(2).max(50),
  color: z.string().min(7).max(7),
  description: z.string().min(5).max(100),
  repeat: z.array(z.string().min(1)),
  frequency: z.preprocess((val) => Number(val), z.number()),
  unit: z.string(),
  time: z.string(),
});

const AddHabitDialog = () => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) return;
    try {
      const newHabiit = createHabit({
        clerkUserID: user.id,
        title: values.title,
        color: values.color,
        description: values.description,
        repeat: values.repeat,
        frequency: values.frequency,
        unit: values.unit,
        time: values.time,
      });
      toast.success("Habit created successfully");
    } catch (e: any) {
      toast.error(e);
    }
  }

  const selectedDays = form.watch("repeat");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="fixed text-5xl hover:bg-secondary hover:text-white bottom-4 right-4 bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer">
          +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mx-auto">
          <DialogTitle className="font-semibold">Add a habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">
                      Name of your habit
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Meditate" {...field} />
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
                    <FormLabel className="font-light">Colour</FormLabel>
                    <FormControl>
                      <Input type="color" placeholder="#FFFFFF" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A habit to train the brain to relax"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="repeat"
                render={() => (
                  <FormItem>
                    <FormLabel className="font-light">Repeat</FormLabel>
                    <DaySelector
                      toggleDay={toggleDay}
                      selectedDays={selectedDays}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Frequency</FormLabel>
                    <FormControl>
                      <Input placeholder="3" type="number" {...field} />
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
                    <FormLabel className="font-light">Unit</FormLabel>
                    <FormControl>
                      <Controller
                        name="unit"
                        control={form.control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="measurement unit" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="times">Times</SelectItem>
                                <SelectItem value="km">Kilometres</SelectItem>
                                <SelectItem value="ml">Millilitres</SelectItem>
                                <SelectItem value="litres">Litres</SelectItem>
                                <SelectItem value="pages">Pages</SelectItem>
                                <SelectItem value="n/a">N/A</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-light">Time</FormLabel>
                    <FormControl>
                      <Input className="w-30" type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end pt-6">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
