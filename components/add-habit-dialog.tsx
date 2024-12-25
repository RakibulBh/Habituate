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

const SelectOption = ({
  value,
  setValue,
  currValue,
  setDays,
}: {
  value: Duration | FrequencyType;
  currValue: Duration | FrequencyType;
  setDays: Dispatch<SetStateAction<string[]>>;
  setValue: Dispatch<SetStateAction<any>>;
}) => {
  return (
    <div
      onClick={() => {
        setValue(value);
        setDays([]);
      }}
      className={cn(
        "rounded-xl py-2 px-4 border hover:cursor-pointer",
        currValue === value
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
  days,
  setDays,
}: {
  value: string;
  days: string[];
  setDays: Dispatch<SetStateAction<string[]>>;
}) => {
  const onClick = () => {
    if (days.includes(value)) {
      setDays(days.filter((val) => val !== value));
    } else {
      setDays([...days, value]);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "p-2 rounded-md hover:cursor-pointer flex items-center justify-center",
        days.includes(value)
          ? "bg-primary text-white border-transparent"
          : "bg-white border-primary text-primary"
      )}
    >
      <p>{value}</p>
    </div>
  );
};

const AddHabitDialog = () => {
  const [duration, setDuration] = useState<Duration>("15 days");
  const [frequency, setFrequency] = useState<FrequencyType>("Weekly");
  const [days, setDays] = useState<string[]>(["M", "W"]);

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
            <Input name="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Duration</Label>
            <div className="flex gap-2">
              {DURATIONS.map((_duration, i) => (
                <SelectOption
                  key={i}
                  setDays={setDays}
                  setValue={setDuration}
                  currValue={duration}
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
                  key={i}
                  setValue={setFrequency}
                  currValue={frequency}
                  value={_frequency}
                  setDays={setDays}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Days</Label>
            <div className="w-full grid grid-cols-7 gap-2">
              {frequency === "Weekly" &&
                WEEKDAYS.map((weekday, index) => (
                  <DaySelector
                    key={index}
                    value={weekday}
                    days={days}
                    setDays={setDays}
                  />
                ))}
              {frequency === "Monthly" &&
                DAYS.map((day, index) => (
                  <DaySelector
                    key={index}
                    value={String(day)}
                    days={days}
                    setDays={setDays}
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

// Hi!

// Just wanted to let you know I got the offer from SquaredUp, however I am now in a position where I have other interviews coming up from big companies such as EA Sports but I am really stuck on my decision, I prioritise learning in any job, so I just wanted an opinion from you weather I should stick with SquaredUp or risk it and perhaps try the other interviews? SquaredUp is great but a lot of people have told me it is much better to have a big named company on your CV as it helps with getting a lot more interviews for grad role etc..What do you think of this?

// Thanks so much!
