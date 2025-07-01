import Link from 'next/link';
import client from '../../lib/contentful';

async function fetchBlogPosts() {
  const entries = await client.getEntries({ content_type: 'blogPost' });
  return entries.items;
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post: any) => (
          <li key={post.sys.id}>
            <Link href={`/blog/${post.fields.slug}`}>
              {post.fields.title}
            </Link>
            <p>{new Date(post.fields.publishDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}