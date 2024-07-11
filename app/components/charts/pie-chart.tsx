'use client';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ title, data }: { title: string; data: ChartData<'pie'> }) {
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        color: '#222222',
        font: {
          size: 24,
        },
      },
    },
  };
  return (
    <div style={{ position: 'relative' }}>
      <Pie data={data} options={options} />
    </div>
  );
}
