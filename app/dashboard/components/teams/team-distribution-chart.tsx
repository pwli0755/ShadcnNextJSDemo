"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Delta",
    value: 55,
    color: "#84cc16",
  },
  {
    name: "Alpha",
    value: 34,
    color: "#3b82f6",
  },
  {
    name: "Canary",
    value: 11,
    color: "#f97316",
  },
];

const TeamDistributionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black !text-sm dark:!bg-black rounded-md dark:!border-border"
        />
        <Pie data={data} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TeamDistributionChart;
