import Link from 'next/link';
import client from '../../../lib/contentful';

// 1. First, find the tag to get its ID
async function fetchTag(slug: string) {
  const entries = await client.getEntries({
    content_type: 'tag',
    'fields.slug': slug,
    limit: 1, // We only need one
  });
  return entries.items[0];
}

// 2. Then, find posts that link to this tag's ID
async function fetchPostsByTagId(tagId: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.tags.sys.id': tagId, // Correct way to filter by a linked entry
  });
  return entries.items;
}

export default async function TagPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Get the tag object first
  const tag = await fetchTag(slug);

  if (!tag) {
    return <div>Tag not found</div>;
  }

  // Now use the tag's ID to find posts
  const posts = await fetchPostsByTagId(tag.sys.id);

  return (
    <div>
      <h1>Tag: {tag.fields.name as string}</h1>
      {posts.length > 0 ? (
        <ul>
          {posts.map((post: any) => (
            <li key={post.sys.id}>
              <Link href={`/blog/${post.fields.slug}`}>
                {post.fields.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found for this tag.</p>
      )}
    </div>
  );
}