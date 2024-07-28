import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import CircleProgress from "./circle-progress";

const formSchema = z.object({
  currValue: z.preprocess((val) => Number(val), z.number()),
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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currValue: value,
    },
  });

  useEffect(() => {
    form.reset({ currValue: value });
  }, [value, form]);

  const onSubmit = (values: FormValues) => {
    onUpdate(values.currValue);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-x-2 items-center">
              <p>Status</p>
              <Switch checked={completed} disabled aria-readonly />
            </div>
            <CircleProgress value={value} goal={goal} />
          </div>
          <div className="space-y-2">
            <h1 className="text-sm">Current progress</h1>
            <div className="flex items-center gap-x-2">
              <Input className="w-20" {...form.register("currValue")} />
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
      </DialogContent>
    </Dialog>
  );
};

export default EditHabitDialog;
