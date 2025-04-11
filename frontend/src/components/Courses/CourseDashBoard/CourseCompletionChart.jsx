import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CourseCompletionChart = ({ courses, stats }) => {
  const data = [
    { name: "Completed", value: stats.coursesCompleted },
    {
      name: "In Progress",
      value: courses.filter((c) => c.progress > 0 && c.progress < 100).length,
    },
    {
      name: "Not Started",
      value: courses.filter((c) => c.progress === 0).length,
    },
  ];

  const COLORS = ["#7e22ce", "#a855f7", "#d8b4fe"];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CourseCompletionChart;
