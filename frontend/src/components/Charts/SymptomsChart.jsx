import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SymptomsChart = ({ sortedSymptoms }) => {
  const [labels, setLabels] = useState([]);
  const [symptomsData, setSymptomsData] = useState([]);

  useEffect(() => {
    if (sortedSymptoms?.length > 0) {
      setLabels(sortedSymptoms.map((item) => item.symptom));
      setSymptomsData(sortedSymptoms.map((item) => item.count));
    }
  }, [sortedSymptoms]);

  const chartData = {
    labels, // X-axis labels
    datasets: [
      {
        label: "Occurrences",
        data: symptomsData, // Y-axis data
        backgroundColor: "rgba(33, 148, 242, 0.2)", // Bar colors
        borderColor: "rgba(33, 148, 242, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Most Common Symptoms",
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis at zero
      },
    },
  };

  return (
    <div className="chart-container h-full w-full flex items-center justify-center">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SymptomsChart;
