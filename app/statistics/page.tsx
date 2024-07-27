"use client";
import { useUser } from "@clerk/nextjs";
import { getUserStats, getUserLevel } from "./actions";
import { useQuery } from "@tanstack/react-query";
import { Zap, Award, Trophy, Target } from "lucide-react";
import UserProfileImage from "@/components/image-with-fallback";

interface UserStats {
  totalHabits: number;
  longestStreak: number;
  averageCompletionRate: number;
  habitStats: HabitStat[];
}

interface HabitStat {
  habitId: string;
  habitTitle: string;
  completionRate: number;
  bestStreak: number;
  completions: number;
}

interface UserLevel {
  level: number;
  currentXP: number;
  xpToNextLevel: number;
}

export default function Statistics() {
  const { user } = useUser();

  const {
    data: stats,
    error: statsError,
    isLoading: statsLoading,
  } = useQuery<UserStats, Error>({
    queryKey: ["stats", user?.id],
    queryFn: () => getUserStats(user!.id),
    enabled: !!user,
  });

  const {
    data: levelData,
    error: levelError,
    isLoading: levelLoading,
  } = useQuery<UserLevel, Error>({
    queryKey: ["userLevel", user?.id],
    queryFn: () => getUserLevel(user!.id),
    enabled: !!user,
  });

  const isLoading = statsLoading || levelLoading;
  const error = statsError || levelError;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <UserLevelCard user={user} levelData={levelData} isLoading={isLoading} />
      <div className="bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Habit Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!isLoading && !error && stats ? (
            <>
              <StatCard
                icon={<Target className="w-8 h-8 text-blue-500" />}
                title="Total Habits"
                value={stats.totalHabits.toString()}
              />
              <StatCard
                icon={<Trophy className="w-8 h-8 text-yellow-500" />}
                title="Longest Streak"
                value={`${stats.longestStreak} days`}
              />
              <StatCard
                icon={<Award className="w-8 h-8 text-green-500" />}
                title="Avg. Completion"
                value={`${(stats.averageCompletionRate * 100).toFixed(2)}%`}
              />
              <StatCard
                icon={<Zap className="w-8 h-8 text-purple-500" />}
                title="Total XP"
                value={levelData ? levelData.currentXP.toString() : "N/A"}
              />
            </>
          ) : (
            <p className="text-center text-gray-600 col-span-4">
              {isLoading
                ? "Loading stats..."
                : "No data available yet. Start tracking your habits to see insights here."}
            </p>
          )}
        </div>
      </div>

      <HabitAnalysis stats={stats} isLoading={isLoading} error={error} />
      <PredictiveInsights />
    </section>
  );
}

interface UserLevelCardProps {
  user: any; // Replace 'any' with the correct Clerk user type if available
  levelData: UserLevel | undefined;
  isLoading: boolean;
}

function UserLevelCard({ user, levelData, isLoading }: UserLevelCardProps) {
  if (isLoading || !levelData) {
    return (
      <div className="h-24 bg-white rounded-2xl shadow-lg animate-pulse"></div>
    );
  }

  const progressPercentage =
    (levelData.currentXP / levelData.xpToNextLevel) * 100;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <div className="flex items-center gap-x-4">
        <UserProfileImage user={user} width={64} height={64} />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">{user?.fullName}</h1>
          <div className="mt-2 flex items-center gap-x-4">
            <div className="flex-1">
              <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <p className="font-semibold text-gray-700">
                Level {levelData.level}
              </p>
            </div>
          </div>
          <p className="mt-1 text-sm text-gray-600">
            {levelData.currentXP} / {levelData.xpToNextLevel} XP
          </p>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

interface HabitAnalysisProps {
  stats: UserStats | undefined;
  isLoading: boolean;
  error: Error | null;
}

function HabitAnalysis({ stats, isLoading, error }: HabitAnalysisProps) {
  if (isLoading) {
    return (
      <div className="h-96 bg-white rounded-2xl shadow-lg animate-pulse"></div>
    );
  }

  if (error || !stats || stats.habitStats.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Individual Habit Analysis
        </h2>
        <p className="text-center text-gray-600">
          No individual habit data available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Individual Habit Analysis
      </h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {stats.habitStats.map((habitStat) => (
          <HabitStatsRow
            key={habitStat.habitId}
            name={habitStat.habitTitle}
            completionRate={(habitStat.completionRate * 100).toFixed(2)}
            longestStreak={habitStat.bestStreak}
            totalCompletions={habitStat.completions}
          />
        ))}
      </div>
    </div>
  );
}

interface HabitStatsRowProps {
  name: string;
  completionRate: string;
  longestStreak: number;
  totalCompletions: number;
}

function HabitStatsRow({
  name,
  completionRate,
  longestStreak,
  totalCompletions,
}: HabitStatsRowProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-lg text-gray-800 mb-2">{name}</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">Completion Rate</p>
          <p className="font-bold text-gray-800">{completionRate}%</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Best Streak</p>
          <p className="font-bold text-gray-800">{longestStreak} days</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Total Completions</p>
          <p className="font-bold text-gray-800">{totalCompletions}</p>
        </div>
      </div>
    </div>
  );
}

function PredictiveInsights() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Predictive Insights
      </h2>
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800">
          Habit at Risk: Evening Reading
        </h3>
        <p className="mt-2 text-yellow-700">
          Your completion rate has dropped by 15% in the last week. Consider
          setting a reminder or adjusting your goal to stay on track.
        </p>
      </div>
    </div>
  );
}
