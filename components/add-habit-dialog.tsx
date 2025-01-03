"use client";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";
import { DAYS, DURATIONS, FREQUENCY, WEEKDAYS } from "@/constants";
import { Duration, FrequencyType } from "@/types";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { createHabit } from "@/app/actions";
import { useAuth } from "@clerk/nextjs";
import DaySelector from "./day-selector";

export interface FormDataType {
  name: string;
  frequency: string;
  duration: string;
  days: string[];
}

const SelectOption = ({
  type,
  formData,
  setFormData,
  formValue,
  value,
}: {
  type: "frequency" | "duration";
  formData: FormDataType;
  formValue: string;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  value: Duration | FrequencyType;
}) => {
  const handleClick = () => {
    if (type === "frequency") {
      setFormData({ ...formData, frequency: value, days: [] });
    } else {
      setFormData({ ...formData, duration: value });
    }
    return;
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "rounded-xl py-2 px-4 border hover:cursor-pointer",
        formValue === value
          ? "bg-primary text-white border-transparent"
          : "bg-white border-primary text-primary"
      )}
    >
      <p>{value}</p>
    </div>
  );
};

const AddHabitDialog = () => {
  const { isLoaded, userId, sessionId } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    frequency: "Weekly",
    duration: "15 days",
    days: ["M", "W"],
  });

  function onSubmit(e: FormEvent) {
    if (!isLoaded || !userId || !sessionId) {
      return;
    }
    e.preventDefault();
    createHabit(formData, userId);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="text-white flex items-center justify-center p-2 gap-2 rounded-md bg-accent">
          <Plus />
          <p>Add Habits</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a habit</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
              name="name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Duration</Label>
            <div className="flex gap-2">
              {DURATIONS.map((_duration, i) => (
                <SelectOption
                  type="duration"
                  key={i}
                  formData={formData}
                  setFormData={setFormData}
                  formValue={formData.duration}
                  value={_duration}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Frequency</Label>
            <div className="flex gap-2">
              {FREQUENCY.map((_frequency, i) => (
                <SelectOption
                  type="frequency"
                  key={i}
                  formData={formData}
                  setFormData={setFormData}
                  formValue={formData.frequency}
                  value={_frequency}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Days</Label>
            <div className="w-full grid grid-cols-7 gap-2">
              {formData.frequency === "Weekly" &&
                WEEKDAYS.map((weekday, index) => (
                  <DaySelector
                    key={index}
                    value={weekday}
                    formData={formData}
                    setFormData={setFormData}
                  />
                ))}
              {formData.frequency === "Monthly" &&
                DAYS.map((day, index) => (
                  <DaySelector
                    key={index}
                    value={String(day)}
                    formData={formData}
                    setFormData={setFormData}
                  />
                ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button className="text-white bg-primary p-4 rounded-md hover:bg-opacity-75 transition-opacity duration-75 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
