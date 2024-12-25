"use client";
import React, { Dispatch, SetStateAction, useState } from "react";
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
import { Button } from "./ui/button";

interface FormDataType {
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
  return (
    <div
      onClick={() => {
        type === "frequency"
          ? setFormData({ ...formData, frequency: value, days: [] })
          : setFormData({ ...formData, duration: value });
      }}
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

const DaySelector = ({
  value,
  setFormData,
  formData,
}: {
  value: string;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
}) => {
  const onClick = () => {
    if (formData.days.includes(value)) {
      setFormData({
        ...formData,
        days: formData.days.filter((val) => val !== value),
      });
    } else {
      setFormData({ ...formData, days: [...formData.days, value] });
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 rounded-md hover:cursor-pointer flex items-center justify-center",
        formData.days.includes(value)
          ? "bg-primary text-white border-transparent"
          : "bg-white border-primary text-primary"
      )}
    >
      <p>{value}</p>
    </div>
  );
};

const AddHabitDialog = () => {
  const [formData, setFormData] = useState({
    name: "",
    frequency: "Weekly",
    duration: "15 days",
    days: ["M", "W"],
  });

  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-4 flex items-center justify-start bg-primary text-white capitalize rounded-xl gap-2">
          <Plus />
          <p className="font-semibold">Add a habit</p>
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
            <Button>Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddHabitDialog;
