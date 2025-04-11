import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CategoryTimeChart = () => {
  const data = [
    { name: "Web Dev", hours: 12 },
    { name: "Programming", hours: 8 },
    { name: "Design", hours: 5 },
    { name: "Computer Science", hours: 3 },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours" fill="#7e22ce" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryTimeChart;
