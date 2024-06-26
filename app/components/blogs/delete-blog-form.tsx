import { deleteBlog } from '@/app/lib/actions';
import FormSubmitBtn from '@/app/components/form-submit-btn';
import { FaTrash } from 'react-icons/fa6';
import type { Blog } from '@prisma/client';

export default function DeleteBlogForm({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: Blog['imageUrl'];
}) {
  const deleteBlogWithId = deleteBlog.bind(null, id, imageUrl);
  return (
    <form action={deleteBlogWithId}>
      <FormSubmitBtn>
        <FaTrash />
        delete
      </FormSubmitBtn>
    </form>
  );
}
