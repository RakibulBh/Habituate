"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  createHabitInstance,
  findHabitInstance,
} from "@/app/dashboard/_actions";
import { useUser } from "@clerk/nextjs";
import { HabitInstance } from "@/types/types";

const formSchema = z.object({
  currValue: z.preprocess((val) => Number(val), z.number()),
});

const EditHabitDialog = ({
  habitId,
  date,
  goal,
  value,
  unit,
}: {
  habitId: string;
  date: string;
  goal: number;
  value: number;
  unit: string;
}) => {
  const { user } = useUser();

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currValue: value,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;
    await createHabitInstance({
      clerkUserId: user.id,
      habitId,
      value: values.currValue,
      date,
      goal,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-tertiary rounded-md w-12 h-12 flex items-center justify-center hover:cursor-pointer hover:bg-secondary text-4xl text-secondary hover:text-white">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Habit</DialogTitle>
          <DialogDescription>
            Here you can update the value of your habit.
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              name="currValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input className="w-20" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormProvider>
        {JSON.stringify({ habitId, date, goal, value, unit })}
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;
