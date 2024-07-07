import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const HabitPieChart = ({
  habitsCompleted,
  totalHabits,
}: {
  habitsCompleted: number;
  totalHabits: number;
}) => {
  const data = [
    { name: "Completed", value: habitsCompleted },
    { name: "Remaining", value: totalHabits - habitsCompleted },
  ];

  const COLORS = ["#00C49F", "#FFBB28"];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default HabitPieChart;
