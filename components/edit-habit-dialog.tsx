"use client";

import React, { useEffect } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { Circle, SquarePen } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createHabitInstance } from "@/app/home/_actions";
import { Switch } from "./ui/switch";
import CircleProgress from "./circle-progress";

type CreateHabitInstanceParams = {
  clerkUserId: string;
  habitId: string;
  value: number;
  date: string;
  goal: number;
};

const formSchema = z.object({
  currValue: z.preprocess((val) => Number(val), z.number()),
});

const EditHabitDialog = ({
  title,
  habitId,
  date,
  goal,
  completed,
  value,
  unit,
  open,
  description,
  onOpenChange,
}: {
  title: string;
  habitId: string;
  date: string;
  goal: number;
  completed: boolean;
  value: number;
  unit: string;
  description: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { mutateAsync: updateHabitProgress } = useMutation({
    mutationFn: async (params: CreateHabitInstanceParams) => {
      await createHabitInstance(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      onOpenChange(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currValue: value,
    },
  });

  useEffect(() => {
    form.reset({ currValue: value });
  }, [value, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    // Optimistic update
    queryClient.setQueryData(
      ["habitInstance", user.id, habitId, date],
      (oldData: any) => ({
        ...oldData,
        value: values.currValue,
        completed: values.currValue >= goal,
      })
    );

    try {
      await updateHabitProgress({
        clerkUserId: user.id,
        habitId,
        value: values.currValue,
        date,
        goal,
      });
    } catch (error) {
      // Revert optimistic update on error
      queryClient.invalidateQueries({
        queryKey: ["habitInstance", user.id, habitId, date],
      });
      console.error(`Error creating habit instance: ${error}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <div className="bg-white text-purple-400">
          <SquarePen />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-x-2 items-center">
                <p>Status</p>
                <Switch
                  className="text-red-400"
                  checked={completed}
                  disabled
                  aria-readonly
                />
              </div>
              <CircleProgress value={value} goal={goal} />
            </div>
            <div className="space-y-2">
              <h1 className="text-sm">Current progress</h1>
              <div className="flex items-center gap-x-2">
                <FormField
                  name="currValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input className="w-20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p>
                  / {goal} {unit}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 justify-end">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save progress</Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;
