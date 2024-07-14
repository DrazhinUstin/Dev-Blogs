import { auth } from '@/auth';
import { fetchUserOverview } from '@/app/lib/data';
import { FaFilePen, FaThumbsUp, FaComments, FaUsers } from 'react-icons/fa6';
import styles from './overview.module.scss';

export default async function Overview() {
  const user = (await auth())?.user;
  const { blogsCount, likesCount, commentsCount, followersCount } = await fetchUserOverview(
    user?.id as string
  );
  return (
    <div className={styles.container}>
      <article>
        <span>
          <FaFilePen />
        </span>
        <div>
          <h2>{blogsCount}</h2>
          <p>Total Blogs</p>
        </div>
      </article>
      <article>
        <span>
          <FaThumbsUp />
        </span>
        <div>
          <h2>{likesCount}</h2>
          <p>Total Likes</p>
        </div>
      </article>
      <article>
        <span>
          <FaComments />
        </span>
        <div>
          <h2>{commentsCount}</h2>
          <p>Total Comments</p>
        </div>
      </article>
      <article>
        <span>
          <FaUsers />
        </span>
        <div>
          <h2>{followersCount}</h2>
          <p>Total Followers</p>
        </div>
      </article>
    </div>
  );
}
