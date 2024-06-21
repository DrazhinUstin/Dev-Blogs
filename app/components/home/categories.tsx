import { fetchCategoriesWithBlogsCount } from '@/app/lib/data';
import Link from 'next/link';
import { FaDatabase, FaDesktop, FaDev, FaGamepad, FaGlobe, FaMobileScreen } from 'react-icons/fa6';
import styles from './categories.module.scss';

const icons: Record<string, JSX.Element> = {
  'Web Development': <FaGlobe />,
  'Mobile App Development': <FaMobileScreen />,
  'Desktop Software Development': <FaDesktop />,
  'Game Development': <FaGamepad />,
  'Data Science and Machine Learning': <FaDatabase />,
  'DevOps and System Administration': <FaDev />,
};

export default async function Categories() {
  const categories = await fetchCategoriesWithBlogsCount();
  return (
    <section>
      <h2>All Categories</h2>
      <div className={styles.container}>
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </section>
  );
}

function CategoryCard({
  name,
  blogsCount,
}: Awaited<ReturnType<typeof fetchCategoriesWithBlogsCount>>[0]) {
  return (
    <article className={styles.card}>
      <span>{icons[name]}</span>
      <h4>{name}</h4>
      <Link href={`/blogs?categoryName=${name}`}>{blogsCount} blogs</Link>
    </article>
  );
}
