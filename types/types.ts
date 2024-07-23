export type HabitType = {
  _id: string;
  userId: string;
  title: string;
  description: string;
  color: string;
  emoji: string;
  repeat: string[];
  frequency: number;
  unit: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type HabitInstance = {
  userId: string;
  habitId: string;
  date: string;
  value: number;
  goal: number;
  completed: boolean;
};
