import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { Empty } from "antd";
import { COLORS } from 'helpers/constants';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartContainer = ({ children }) => {
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <div style={{ width: "100%", height: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const BarChartComponent = ({ data }) => (
  <ChartContainer>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ChartContainer>
);

const PieChartComponent = ({ data }) => (
  <ChartContainer>
    <PieChart>
      <Legend iconSize={10} verticalAlign="top" layout="horizontal" />
      <Pie
        data={data}
        labelLine={false}
        label={renderCustomizedLabel}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ChartContainer>
);

const RadarChartComponent = ({ data }) => (
  <ChartContainer>
    <RadarChart data={data}>
      <Tooltip />
      <PolarGrid />
      <PolarAngleAxis dataKey="name" />
      <PolarRadiusAxis />
      <Radar
        dataKey="value"
        stroke="#8884d8"
        fill="#8884d8"
        fillOpacity={0.6}
      />
    </RadarChart>
  </ChartContainer>
);

const Graph = ({ data, mode }) => {
  const render = () => {
    switch (mode) {
      case "bar":
        return <BarChartComponent data={data} />;
      case "pie":
        return <PieChartComponent data={data} />;
      case "radar":
        return <RadarChartComponent data={data} />;
      default:
        return <Empty />;
    }
  };
  return data?.length ? render() : null;
};

export default Graph;
