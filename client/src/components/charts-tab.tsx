import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import type { AnalysisResponse } from "@/lib/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface ChartsTabProps {
  data: AnalysisResponse["chartData"];
}

export function ChartsTab({ data }: ChartsTabProps) {
  const revenueChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const revenueChartData = {
    labels: data.revenue.labels,
    datasets: [
      {
        label: "Revenue ($M)",
        data: data.revenue.data,
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F620",
        borderWidth: 3,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const regionalChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
    },
  };

  const regionalChartData = {
    labels: data.regional.labels,
    datasets: [
      {
        data: data.regional.data,
        backgroundColor: data.regional.colors,
        borderWidth: 0,
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const categoryChartData = {
    labels: data.categories.labels,
    datasets: [
      {
        label: "Sales ($K)",
        data: data.categories.data,
        backgroundColor: data.categories.colors,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 sm:p-8"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Revenue Trends by Quarter
          </h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <Line data={revenueChartData} options={revenueChartOptions} />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Regional Distribution
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <Doughnut data={regionalChartData} options={regionalChartOptions} />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Product Categories
            </h3>
            <div className="bg-gray-50 rounded-xl p-4">
              <Bar data={categoryChartData} options={categoryChartOptions} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
