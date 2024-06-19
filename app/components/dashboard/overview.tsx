import { auth } from '@/auth';
import { fetchUserOverview } from '@/app/lib/data';
import { FaFilePen, FaThumbsUp, FaComments } from 'react-icons/fa6';

export default async function Overview() {
  const user = (await auth())?.user;
  const { blogsCount, likesCount, commentsCount } = await fetchUserOverview(user?.id as string);
  return (
    <div>
      <article>
        <span>
          <FaFilePen />
        </span>
        <div>
          <h4>Blogs Created:</h4>
          <p>{blogsCount}</p>
        </div>
      </article>
      <article>
        <span>
          <FaThumbsUp />
        </span>
        <div>
          <h4>Likes On Created Blogs:</h4>
          <p>{likesCount}</p>
        </div>
      </article>
      <article>
        <span>
          <FaComments />
        </span>
        <div>
          <h4>Comments On Created Blogs:</h4>
          <p>{commentsCount}</p>
        </div>
      </article>
    </div>
  );
}
