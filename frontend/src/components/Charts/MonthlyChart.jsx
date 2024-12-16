import React from "react";
import { Line } from "react-chartjs-2";

const MonthlyChart = ({ monthlyData }) => {
  const labels = ["January", "February", "March", "April", "May", "June", "July", "August","September","October", "November", "December"];
    let monthlyChartData = new Array(12).fill(0);
    
  monthlyData.forEach((data) => {
    const month = data.month;
    if (month >= 1 && month <= 12) {
      monthlyChartData[month] = data.count;
    }
  });
    
  const chartData = {
    labels: labels, // X-axis labels
    datasets: [
      {
        label: "monthly patient", // Legend label
        data: monthlyChartData, // Y-axis data
        borderColor: "rgba(33, 148, 242, 1)", // Line color
        backgroundColor: "rgba(33, 148, 242, 0.2)", // Fill color under the line
        tension: 0.4, // Smoothing of the line
      },
    ],
  };

  // Define the options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top", // Legend position
      },
      title: {
        display: true,
        text: "Monthly Patient Data", // Title of the chart
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months", // Label for the X-axis
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis from 0
        title: {
          display: true,
          text: "Number of Patients", // Label for the Y-axis
        },
      },
    },
  };
  return (
      <div>
          {console.log(monthlyChartData)}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MonthlyChart;
