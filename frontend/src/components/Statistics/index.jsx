import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useEffect, useRef, useState } from "react";

const Statistics = ({ title, value, color }) => {
  const initialData = {
    labels: ["0", "2", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22"],
    datasets: [
      {
        label: title,
        data: [], 
        borderColor: color,
        backgroundColor: "transparent",
        borderWidth: 2,
        pointBackgroundColor: ["red", "blue"],
        pointBorderWidth: 5,
      },
    ],
  };

  const [chartData, setChartData] = useState(initialData);
  const count = useRef(0);

  useEffect(() => {
    setChartData((prevData) => {
      let newData;
      if (count.current < 12) {
        count.current += 1;
        newData = [...prevData.datasets[0].data, value];
      } else {
        newData = [value];
        count.current = 0;
      }

      return {
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: newData,
          },
        ],
      };
    });
  }, [value]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <h1
        className="text-2xl font-bold text-gray-700 mb-4"
        style={{ color: color }}
      >
        Biểu đồ {title}
      </h1>
      <div className="p-4 bg-gray-100 rounded-lg">
        <Line
          data={chartData}
          options={{ maintainAspectRatio: false }}
          height={300}
        />
      </div>
    </div>
  );
};

export default Statistics;
