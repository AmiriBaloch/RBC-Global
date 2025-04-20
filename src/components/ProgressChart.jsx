import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './ProgressChart.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProgressChart = ({ targetValue = 100, title = "Progress" }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 75) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Project Progress',
        data: [10, 20, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75],
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(30, 179, 127, 0.2)',
        borderColor: '#1eb37f',
        pointBackgroundColor: '#1eb37f',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#1eb37f'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#000000',
          font: {
            size: 10
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#333333',
          font: {
            size: 10
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#FFF',
        titleColor: '#000',
        bodyColor: '#000',
        borderColor: '#DDD',
        borderWidth: 1,
        padding: 10,
        boxWidth: 10,
        boxHeight: 10,
        usePointStyle: true,
        callbacks: {
          title: () => 'Progress',
          label: (context) => `${context.parsed.y}% complete`
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      },
      point: {
        radius: 3,
        hoverRadius: 5
      }
    }
  };

  return (
    <div ref={ref} className={`progress-chart-container ${isVisible ? 'animate-progress' : ''}`}>
      <div className="progress-chart-inner">
        <h3 className="progress-chart-title">Completion Rate</h3>
        <div className="chart-wrapper">
          <Line data={chartData} options={chartOptions} />
        </div>
        <div className="progress-value">
          <span className="progress-percentage">{progress}%</span>
          <span className="progress-complete">complete</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart; 