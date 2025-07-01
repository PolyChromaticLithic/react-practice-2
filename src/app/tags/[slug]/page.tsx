import Link from 'next/link';
import client from '../../../lib/contentful';
import blogSpecificStyles from '../../blog/blog-specific.module.css';
import TagSidebar from '../../../components/TagSidebar';

async function fetchTag(slug: string) {
  const entries = await client.getEntries({
    content_type: 'tag',
    'fields.slug': slug,
    limit: 1,
  });
  return entries.items[0];
}

async function fetchPostsByTagId(tagId: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.tags.sys.id': tagId,
    order: ['-fields.publishDate'],
  });
  return entries.items;
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tag = await fetchTag(slug);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  const posts = await fetchPostsByTagId(tag.sys.id);

  return (
    <div className={blogSpecificStyles.blogLayout}>
      <div>
        <h1 className={blogSpecificStyles.title}>Tag: {tag.fields.name as string}</h1>
        {posts.length > 0 ? (
          <ul className={blogSpecificStyles.postList}>
            {posts.map((post: any) => (
              <li key={post.sys.id} className={blogSpecificStyles.postCard}>
                <Link href={`/blog/${post.fields.slug}`}>
                  <h2 className={blogSpecificStyles.postTitle}>{post.fields.title}</h2>
                  <p className={blogSpecificStyles.postDate}>{new Date(post.fields.publishDate).toLocaleDateString()}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found for this tag.</p>
        )}
      </div>
      <TagSidebar />
    </div>
  );
}