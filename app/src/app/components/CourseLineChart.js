"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CourseLineChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label, data }) => {
    if (active && payload && payload.length) {
      // Find the lecture name
      const lecture = data.find((d) => d["Video Number"] === label);
      const lectureName = lecture ? lecture.title : "";

      return (
        <div
          style={{
            backgroundColor: "#3e4452",
            border: "none",
            borderRadius: "15px",
            padding: "10px",
          }}
        >
          <p>{lectureName}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`}>{`${
              entry.name
            }: ${entry.value.toLocaleString()}`}</p>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, bottom: 30, left: 20 }}
      >
        <Line type="monotone" dataKey="Expected Views" stroke="#fffefe" />
        <Line type="monotone" dataKey="Actual Views" stroke="#9dff00" />
        {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
        <XAxis
          dataKey="Video Number"
          tick={{ fill: "white" }}
          label={{
            value: "Video Lecture Number",
            position: "insideBottom",
            offset: -30,
            fill: "white",
          }}
        />
        <YAxis
          tick={{ fill: "white" }}
          tickFormatter={(tick) => tick.toLocaleString()}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#00064a",
            border: "none",
            borderRadius: "15px",
          }}
          content={<CustomTooltip data={data} />}
          formatter={(value, name) => [value.toLocaleString(), name]}
        />

        <Legend verticalAlign="top" height={36} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CourseLineChart;
