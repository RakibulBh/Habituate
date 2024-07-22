"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getHabitMetrics, getLongestStreak } from "./actions";

export default function Statistics() {
  const { user } = useUser();

  const [streak, setStreak] = useState<number | null>(null);
  const [habitMetrics, setHabitMetrics] = useState<any[]>([]);

  useEffect(() => {
    async function fetchStreak() {
      if (!user) return null;

      const streak = await getLongestStreak(user.id);
      setStreak(streak);

      const habitMetrics = await getHabitMetrics(user.id);
      setHabitMetrics(habitMetrics);
    }

    fetchStreak();
  }, []);

  const overviewData = [
    {
      title: "Total habits",
      value: habitMetrics.length,
      bgColor: "#B6E4FF",
      textColor: "#1BABFF",
    },
    {
      title: "Longest streak",
      value: `${streak} days`,
      bgColor: "#bdeac3",
      textColor: "#1F852C",
    },
    {
      title: "Avg. completion rate",
      value: `${(
        (habitMetrics.reduce((acc, metric) => acc + metric.completionRate, 0) /
          habitMetrics.length) *
        100
      ).toFixed(2)}%`,
      bgColor: "#F8F6C5",
      textColor: "#94913D",
    },
    {
      title: "Milestones achieved",
      value: 12, // Replace this with your logic to calculate milestones achieved
      bgColor: "#F9C5E8",
      textColor: "#FB5EC8",
    },
  ];

  return (
    <section className="mx-10 py-8 space-y-8 max-h-screen overflow-y-auto">
      <p className="text-2xl">Your habit insights</p>
      <div className="bg-gray-100 rounded-xl px-6 py-4 flex flex-col space-y-4">
        <p className="text-2xl font-semibold">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewData.map((data) => (
            <div
              key={data.title}
              style={{ backgroundColor: data.bgColor }}
              className="p-4 rounded-xl flex flex-col items-center"
            >
              <p
                style={{ color: data.textColor }}
                className="text-lg font-medium mb-2"
              >
                {data.title}
              </p>
              <div className="text-center">
                <p
                  className="text-2xl font-bold"
                  style={{ color: data.textColor }}
                >
                  {data.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-100 h-96 px-4 py-6 rounded-xl flex flex-col space-y-2">
        <p className="text-2xl">Individual Habit Analysis</p>
        <div className="flex-1 overflow-y-scroll space-y-2">
          {habitMetrics.map((metric) => (
            <HabitStatsRow
              key={metric.habitId}
              name={metric.habitName}
              completionRate={(metric.completionRate * 100).toFixed(2)}
              longestStreak={metric.longestStreak}
              totalCompletions={metric.totalCompletions}
            />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 h-44 px-4 py-4 rounded-xl space-y-2">
        <p className="text-2xl">Predictive Insights</p>
        <PredictiveInsight />
      </div>
    </section>
  );
}

function HabitStatsRow({
  name,
  completionRate,
  longestStreak,
  totalCompletions,
}: {
  name: string;
  completionRate: string;
  longestStreak: number;
  totalCompletions: number;
}) {
  return (
    <div className="space-y-2">
      <h1 className="font-semibold">{name}</h1>
      <div className="justify-between flex items-center border-b-2 pb-2 border-gray-300">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Completion rate</p>
          <p className="font-semibold">{completionRate}%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Best streak</p>
          <p className="font-semibold">{longestStreak}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Completions</p>
          <p className="font-semibold">{totalCompletions}</p>
        </div>
      </div>
    </div>
  );
}

function PredictiveInsight() {
  return (
    <div className="border-l-[#A56E00] border-l-4 rounded-xl bg-[#FAE6BE] space-y-2 pl-4 py-4 box-border">
      <h1>
        Habit at Risk: <strong>Evening reading</strong>
      </h1>
      <p className="text-sm">
        Your completion rate has dropped by 15% in the last week. Consider
        setting a reminder or adjusting your goal to stay on track.
      </p>
    </div>
  );
}
