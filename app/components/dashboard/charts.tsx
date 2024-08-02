import { auth } from '@/auth';
import { fetchUserBlogsChartData, fetchUserCategoriesChartData } from '@/app/lib/data';
import type { ChartData } from 'chart.js';
import BarChart from '@/app/components/charts/bar-chart';
import PieChart from '@/app/components/charts/pie-chart';
import styles from './charts.module.scss';

export default async function Charts() {
  const userId = (await auth())?.user?.id as string;
  const [blogsChartData, categoriesChartData] = await Promise.all([
    fetchUserBlogsChartData(userId),
    fetchUserCategoriesChartData(userId),
  ]);

  const barChartData: ChartData<'bar'> = {
    labels: blogsChartData.labels,
    datasets: [
      {
        label: 'Likes',
        data: blogsChartData.data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData: ChartData<'pie'> = {
    labels: categoriesChartData.labels,
    datasets: [
      {
        label: 'Blogs count',
        data: categoriesChartData.data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      {blogsChartData.data[0] && <BarChart title='Blogs Likes' data={barChartData} />}
      {categoriesChartData.data[0] && <PieChart title='Blogs Categories' data={pieChartData} />}
    </div>
  );
}
