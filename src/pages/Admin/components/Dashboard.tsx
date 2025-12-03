import React from "react";
import { Card } from "antd";
import {
  HeartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const statsCards = [
    {
      icon: <HeartOutlined className="text-blue-500" />,
      count: "178+",
      label: "Tours",
      bgColor: "bg-blue-50",
    },
    {
      icon: <ShoppingOutlined className="text-yellow-500" />,
      count: "20+",
      label: "Customers",
      bgColor: "bg-yellow-50",
    },
    {
      icon: <ShoppingCartOutlined className="text-orange-500" />,
      count: "190+",
      label: "Booking",
      bgColor: "bg-orange-50",
    },
  ];

  const chartData = {
    labels: ['10am', '11am', '12am', '01am', '02am', '03am', '04am', '05am', '06am', '07am'],
    datasets: [
      {
        label: 'Tours',
        data: [50, 60, 55, 70, 65, 75, 70, 65, 60, 55],
        borderColor: '#60A5FA',
        backgroundColor: 'rgba(96, 165, 250, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: 'Booking',
        data: [100, 80, 90, 50, 60, 55, 120, 110, 130, 125],
        borderColor: '#C084FC',
        backgroundColor: 'rgba(192, 132, 252, 0.1)',
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#1F2937',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#374151',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          stepSize: 20,
        },
        max: 100,
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <Card key={index} className="rounded-xl border-gray-200">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.count}</h3>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Reports Chart */}
      <Card className="rounded-xl border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Reports</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreOutlined />
          </button>
        </div>
        
        {/* Chart */}
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
