import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { findHabitInstance, updateHabitInstance } from "@/app/home/_actions";
import EditHabitDialog from "./edit-habit-dialog";
import { HabitInstanceType } from "@/types/types";
import { Button } from "./ui/button";

interface HabitProps {
  title: string;
  emoji: string;
  frequency: number;
  unit: string;
  description: string;
  date: string;
  habitId: string;
  color: string;
}

const Habit: React.FC<HabitProps> = ({
  title,
  emoji,
  frequency,
  unit,
  description,
  date,
  habitId,
  color,
}) => {
  const { user } = useUser();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: habitInstance, isLoading } = useQuery<HabitInstanceType | null>(
    {
      queryKey: ["habitInstance", user?.id, habitId, date],
      queryFn: () =>
        findHabitInstance({ clerkUserId: user?.id!, habitId, date }),
      enabled: !!user,
    }
  );

  const updateMutation = useMutation({
    mutationFn: updateHabitInstance,
    onMutate: async (newHabit) => {
      await queryClient.cancelQueries({
        queryKey: ["habitInstance", user?.id, habitId, date],
      });
      const previousHabit = queryClient.getQueryData<HabitInstanceType>([
        "habitInstance",
        user?.id,
        habitId,
        date,
      ]);
      queryClient.setQueryData<HabitInstanceType>(
        ["habitInstance", user?.id, habitId, date],
        (old) => ({ ...old, ...newHabit } as HabitInstanceType)
      );
      return { previousHabit };
    },
    onError: (err, newHabit, context) => {
      queryClient.setQueryData(
        ["habitInstance", user?.id, habitId, date],
        context?.previousHabit
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["habitInstance", user?.id, habitId, date],
      });
    },
  });

  const handleEditClick = () => {
    setDialogOpen(true);
  };

  const handleUpdate = (newValue: number) => {
    updateMutation.mutate({
      clerkUserId: user?.id!,
      habitId,
      value: newValue,
      date,
      goal: frequency,
    });
  };

  return (
    <div className="bg-[#F8F8F8] rounded-md px-5 py-3 flex items-center justify-between">
      <div className="flex gap-x-3 items-center">
        <div
          style={{ backgroundColor: color }}
          className="w-2 h-16 rounded-xl"
        />
        <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center text-4xl">
          {emoji}
        </div>
        <div className="space-y-[1px]">
          <h1>{title}</h1>
          <span className="flex items-center space-x-2">
            <p>{`${habitInstance ? habitInstance.value : 0} `}</p>
            <p className="text-gray-400">
              / {frequency} {unit}
            </p>
          </span>
        </div>
      </div>
      <Button onClick={handleEditClick}>Edit</Button>
      <EditHabitDialog
        title={title}
        description={description}
        completed={habitInstance ? habitInstance.value >= frequency : false}
        value={habitInstance ? habitInstance.value : 0}
        goal={frequency}
        unit={unit}
        open={isDialogOpen}
        onOpenChange={setDialogOpen}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Habit;
