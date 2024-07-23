"use client";
import { useUser } from "@clerk/nextjs";
import { getUserStats } from "./actions";
import { useQuery } from "@tanstack/react-query";

export default function Statistics() {
  const { user } = useUser();

  const {
    data: stats,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: () => getUserStats(user!.id),
    enabled: !!user,
  });

  console.log(stats);

  return (
    <section className="mx-10 py-8 space-y-8 max-h-screen overflow-y-auto">
      <p className="text-2xl font-bold text-gray-800">Your Habit Insights</p>
      <div className="bg-white shadow-md rounded-xl px-6 py-4 flex flex-col space-y-4">
        <p className="text-2xl font-semibold text-gray-800">Overview</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {!isLoading && !error && stats ? (
            <>
              <StatCard
                title="Total habits"
                value={stats.totalHabits?.toString() || "0"}
              />
              <StatCard
                title="Longest streak"
                value={`${stats.longestStreak || 0} days`}
              />
              <StatCard
                title="Avg. completion rate"
                value={`${(stats.averageCompletionRate * 100 || 0).toFixed(
                  2
                )}%`}
              />
              <StatCard title="Total acheivements" value={"N/A"} />
            </>
          ) : (
            <p className="text-center text-gray-600 col-span-4">
              No data available yet. Start tracking your habits to see insights
              here.
            </p>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md h-96 px-4 py-6 rounded-xl flex flex-col space-y-2">
        <p className="text-2xl font-semibold text-gray-800">
          Individual Habit Analysis
        </p>
        <div className="flex-1 overflow-y-scroll space-y-2">
          {!isLoading && !error && stats && stats.habitStats.length > 0 ? (
            stats.habitStats.map((habitStat: any) => (
              <HabitStatsRow
                key={habitStat.habitId}
                name={habitStat.habitTitle}
                completionRate={(habitStat.completionRate * 100).toFixed(2)}
                longestStreak={habitStat.bestStreak}
                totalCompletions={habitStat.completions}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">
              No individual habit data available yet.
            </p>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md h-44 px-4 py-4 rounded-xl space-y-2">
        <p className="text-2xl font-semibold text-gray-800">
          Predictive Insights
        </p>
        <PredictiveInsight />
      </div>
    </section>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div
      key={title}
      className="p-4 rounded-xl flex flex-col items-center bg-gray-50 shadow-sm"
    >
      <p className="text-lg font-medium text-gray-600 mb-2">{title}</p>
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
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
    <div className="space-y-2 bg-gray-50 shadow-sm p-4 rounded-lg">
      <h1 className="font-semibold text-gray-800">{name}</h1>
      <div className="flex justify-between items-center border-b-2 pb-2 border-gray-300">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Completion rate</p>
          <p className="font-semibold text-gray-800">{completionRate}%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Best streak</p>
          <p className="font-semibold text-gray-800">{longestStreak}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Completions</p>
          <p className="font-semibold text-gray-800">{totalCompletions}</p>
        </div>
      </div>
    </div>
  );
}

function PredictiveInsight() {
  return (
    <div className="border-l-4 border-yellow-600 rounded-xl bg-yellow-100 space-y-2 pl-4 py-4 box-border">
      <h1 className="text-gray-800">
        Habit at Risk: <strong>Evening reading</strong>
      </h1>
      <p className="text-sm text-gray-600">
        Your completion rate has dropped by 15% in the last week. Consider
        setting a reminder or adjusting your goal to stay on track.
      </p>
    </div>
  );
}
