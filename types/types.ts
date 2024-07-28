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

// types.ts
export interface HabitInstanceType {
  _id: string;
  userId: string;
  habitId: string;
  value: number;
  goal: number;
  date: string;
  completed: boolean;
}

export interface HabitInstanceUpdateParams {
  clerkUserId: string;
  habitId: string;
  value: number;
  date: string;
  goal: number;
}

export interface HabitInstanceFindParams {
  clerkUserId: string;
  habitId: string;
  date: string;
}
