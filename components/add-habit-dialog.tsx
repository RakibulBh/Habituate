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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import EmojiPicker from "emoji-picker-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateHabit } from "@/app/habits/actions";
import { HabitType } from "@/types/types";

type HabitData = {
  clerkUserID: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  repeat: string[];
  frequency: number;
  unit: string;
  time: string;
};

type AddHabitDialogProps = {
  initialData?: HabitType;
  onSubmit: (data: HabitData) => void; // Remove the optional '?'
  onCancel: () => void;
  isEditing?: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
const colorOptions = [
  { value: "#4A90E2", label: "Sky Blue" },
  { value: "#50C878", label: "Emerald Green" },
  { value: "#F08080", label: "Coral" },
  { value: "#9370DB", label: "Medium Purple" },
  { value: "#20B2AA", label: "Light Sea Green" },
  { value: "#F4A460", label: "Sandy Brown" },
  { value: "#778899", label: "Light Slate Gray" },
  { value: "#14B8A6", label: "Teal" },
  { value: "#0D9488", label: "Dark Teal" },
  { value: "#0891B2", label: "Cyan" },
  { value: "#0369A1", label: "Blue" },
  { value: "#059669", label: "Emerald" },
  { value: "#65A30D", label: "Lime" },
  { value: "#CA8A04", label: "Yellow" },
];

const formSchema = z.object({
  title: z.string().min(2).max(30),
  emoji: z.string().min(1), // Increase max length to accommodate complex emojis
  color: z.string().length(7),
  description: z.string().min(5).max(50),
  repeat: z.array(z.string().min(1)),
  frequency: z.coerce.number(),
  unit: z.string(),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
});

const AddHabitDialog: React.FC<AddHabitDialogProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
  open,
  onOpenChange,
}) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
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

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      isEditing
        ? updateHabit({
            habitId: initialData!._id,
            clerkUserId: user!.id,
            updatedData: data,
          })
        : createHabit({ ...data, clerkUserID: user!.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits", user!.id] });
      toast.success(
        isEditing ? "Habit updated successfully" : "Habit created successfully"
      );
      if (onSubmit) {
        onSubmit(form.getValues() as HabitData);
      }
      onOpenChange(false);
    },

    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(
        isEditing ? "Failed to update habit" : "Failed to create habit"
      );
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleDay = (day: string) => {
    const currentRepeat = form.getValues("repeat");
    const updatedRepeat = currentRepeat.includes(day)
      ? currentRepeat.filter((d) => d !== day)
      : [...currentRepeat, day];
    form.setValue("repeat", updatedRepeat);
  };

  const selectedDays = form.watch("repeat");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isEditing && (
        <DialogTrigger asChild>
          <Button className="px-4 py-2 w-full bg-[#A855F7] hover:bg-[#9333EA]">
            + Add New Habit
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-teal-700">
            {isEditing ? "Edit Habit" : "Create Habit"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="flex gap-x-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-teal-700">Title</FormLabel>{" "}
                    <FormControl>
                      <Input
                        placeholder="Enter the title"
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500"
                        {...field}
                      />
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
                          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-lg p-2">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-lg font-semibold">
                                  Choose an emoji
                                </span>
                                <Button
                                  type="button"
                                  onClick={() => setShowEmojiPicker(false)}
                                  className="text-sm"
                                >
                                  Close
                                </Button>
                              </div>
                              <EmojiPicker
                                onEmojiClick={(emojiObject) => {
                                  field.onChange(emojiObject.emoji);
                                  setShowEmojiPicker(false);
                                }}
                                width={300}
                                height={400}
                              />
                            </div>
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
                      <Input
                        type="number"
                        placeholder="Frequency"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))} // Convert to number
                      />
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
                          <SelectItem value="mL">Millilitres</SelectItem>
                          <SelectItem value="M">Meters</SelectItem>
                          <SelectItem value="Km">Kilometres</SelectItem>
                          <SelectItem value="minutes">Minutes</SelectItem>
                          <SelectItem value="hours">Hours</SelectItem>
                          <SelectItem value="steps">Steps</SelectItem>
                          <SelectItem value="calories">Calories</SelectItem>
                          <SelectItem value="reps">Repetitions</SelectItem>
                          <SelectItem value="sets">Sets</SelectItem>
                          <SelectItem value="words">Words</SelectItem>
                          <SelectItem value="chapters">Chapters</SelectItem>
                          <SelectItem value="g">Grams</SelectItem>
                          <SelectItem value="kg">Kilograms</SelectItem>
                          <SelectItem value="oz">Ounces</SelectItem>
                          <SelectItem value="lb">Pounds</SelectItem>
                          <SelectItem value="glasses">Glasses</SelectItem>
                          <SelectItem value="servings">Servings</SelectItem>
                          <SelectItem value="sessions">Sessions</SelectItem>
                          <SelectItem value="tasks">Tasks</SelectItem>
                          <SelectItem value="percent">Percent</SelectItem>
                          <SelectItem value="dollars">Dollars</SelectItem>
                          <SelectItem value="euros">Euros</SelectItem>
                          <SelectItem value="miles">Miles</SelectItem>
                          <SelectItem value="cm">Centimeters</SelectItem>
                          <SelectItem value="songs">Songs</SelectItem>
                          <SelectItem value="episodes">Episodes</SelectItem>
                          <SelectItem value="pushups">Push-ups</SelectItem>
                          <SelectItem value="situps">Sit-ups</SelectItem>
                          <SelectItem value="squats">Squats</SelectItem>
                          <SelectItem value="laps">Laps</SelectItem>
                          <SelectItem value="breaths">Breaths</SelectItem>
                          <SelectItem value="poses">Poses</SelectItem>
                          <SelectItem value="problems">Problems</SelectItem>
                          <SelectItem value="questions">Questions</SelectItem>
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
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditing
                    ? "Updating..."
                    : "Creating..."
                  : isEditing
                  ? "Update Habit"
                  : "Create Habit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
