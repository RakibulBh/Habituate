import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { CheckCircle2, XCircle } from "lucide-react";

const formSchema = z.object({
  currValue: z.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

interface EditHabitDialogProps {
  title: string;
  description: string;
  completed: boolean;
  value: number;
  goal: number;
  unit: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (value: number) => void;
}

const EditHabitDialog: React.FC<EditHabitDialogProps> = ({
  title,
  description,
  completed,
  value,
  goal,
  unit,
  open,
  onOpenChange,
  onUpdate,
}) => {
  const [sliderValue, setSliderValue] = useState(value);

  const { control, handleSubmit, setValue } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currValue: value,
    },
  });

  useEffect(() => {
    setValue("currValue", value);
    setSliderValue(value);
  }, [value, setValue]);

  const onSubmit = (values: FormValues) => {
    onUpdate(values.currValue);
    onOpenChange(false);
  };

  const percentage = Math.round((sliderValue / goal) * 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 max-w-md rounded-lg shadow-lg">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
            {title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <div className="w-24 h-24">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  textSize: "20px",
                  pathColor: completed ? "#10B981" : "#3B82F6",
                  textColor: completed ? "#10B981" : "#3B82F6",
                  trailColor: "#E5E7EB",
                })}
              />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                Status
              </span>
              {completed ? (
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              ) : (
                <XCircle className="w-10 h-10 text-red-500" />
              )}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Current progress
            </label>
            <div className="flex items-center gap-x-4">
              <Controller
                name="currValue"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    className="w-20 text-center border-gray-300 rounded-md"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      field.onChange(value);
                      setSliderValue(value);
                    }}
                  />
                )}
              />
              <span className="text-gray-600 dark:text-gray-300">
                / {goal} {unit}
              </span>
            </div>
            <Controller
              name="currValue"
              control={control}
              render={({ field }) => (
                <Slider
                  min={0}
                  max={goal}
                  step={1}
                  value={[sliderValue]}
                  onValueChange={(values) => {
                    const value = values[0];
                    field.onChange(value);
                    setSliderValue(value);
                  }}
                  className="w-full"
                />
              )}
            />
          </div>
          <div className="flex gap-x-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-md text-gray-600 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              Save progress
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;
