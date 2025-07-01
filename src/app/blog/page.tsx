
import Link from 'next/link';
import client from '../../lib/contentful';

async function fetchBlogPosts() {
  const entries = await client.getEntries({ content_type: 'blogPost', include: 2 });
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
            <div>
              {post.fields.tags && (post.fields.tags as any[]).map((tag: any) => (
                <Link key={tag.sys.id} href={`/tags/${tag.fields.slug}`}>
                  <span style={{ marginRight: '10px', backgroundColor: '#eee', padding: '5px' }}>
                    {tag.fields.name}
                  </span>
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
