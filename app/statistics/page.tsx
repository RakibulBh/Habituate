"use client";

function HabitStatsRow() {
  return (
    <div className="space-y-2">
      <h1>Morning meditation</h1>
      <div className="justify-between flex items-center border-b-2 pb-2 border-gray-300">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Completion rate</p>
          <p className="font-semibold">92%</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Best streak</p>
          <p className="font-semibold">14 days</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Total Completions</p>
          <p className="font-semibold">28</p>
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
        Your completion rate has dropped by 15% in the last week. cONSIDER
        SETTING A REMINDER OR ADJUSTING YOUR GOAL TO STAY ON TRACK
      </p>
    </div>
  );
}

export default function Statistics() {
  const overviewData = [
    {
      title: "Total habits",
      value: 10,
      bgColor: "#B6E4FF",
      textColor: "#1BABFF",
    },
    {
      title: "Longest streak",
      value: "5 days",
      bgColor: "#bdeac3",
      textColor: "#1F852C",
    },
    {
      title: "Avg. completion rate",
      value: "78%",
      bgColor: "#F8F6C5",
      textColor: "#94913D",
    },
    {
      title: "Milestones achieved",
      value: 12,
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
          <HabitStatsRow />
          <HabitStatsRow />
          <HabitStatsRow />
          <HabitStatsRow />
          <HabitStatsRow />
        </div>
      </div>
      <div className="bg-gray-100 h-44 px-4 py-4 rounded-xl space-y-2">
        <p className="text-2xl">Predictivite Insights</p>
        <PredictiveInsight />
      </div>
    </section>
  );
}

// how to setup data

// For the amount of habits completed, i can just count the amount of times the user has completed a habit instance
// for longest steak i can check how many days consecutively there has been a habit instance for a habit
// completion rate is just the total amount of habits that there were / the amount of habits i have done as instances

// total habits is easy, just get all habits and count
// lomgest streak is quite useless, i will leave that
// avg. completiton rate can be found by counting all the habits created form the beggining and how many i have done from the beggining too
// milestones achieved is easy
