"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const formSchema = z.object({
  habitName: z.string().min(2).max(50),
  habitFrequency: z.array(z.string().min(2)),
  habitTime: z.string(),
});

export function AddHabitDialog() {
  const { userId } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habitName: "",
      habitFrequency: [],
      habitTime: "",
    },
  });

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
        <Button>Add habit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a habit</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="habitName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit title</FormLabel>
                  <FormControl>
                    <Input placeholder="Meditate" {...field} />
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
              name="habitFrequency"
              render={() => (
                <FormItem>
                  <FormLabel>Repeat</FormLabel>
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
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormDescription>Set the time for the habit</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
              Save changes
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
