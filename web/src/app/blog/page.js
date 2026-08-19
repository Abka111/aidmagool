import { getBlock, getPosts } from '@/lib/cms';
import { pageMetadata } from '@/lib/metadata';
import { PageHead } from '@/components/ui';
import BlogIndex from '@/components/BlogIndex';

export const revalidate = 60;

export async function generateMetadata() {
  const head = await getBlock('blog.head');

  return pageMetadata({
    title: head.title,
    description: head.lead,
    path: '/blog',
  });
}

const Blog = async () => {
  const [head, posts] = await Promise.all([getBlock('blog.head'), getPosts()]);

  return (
    <>
      <PageHead eyebrow={head.eyebrow} title={head.title} lead={head.lead} />

      <BlogIndex posts={posts} />
    </>
  );
};

export default Blog;
