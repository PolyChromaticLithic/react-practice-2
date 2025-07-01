
import Link from 'next/link';
import client from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

async function fetchBlogPost(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2, // Include 2 levels of linked entries to get tags
  });
  return entries.items[0];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const { title, publishDate, content, tags } = post.fields;

  return (
    <div>
      <h1>{title as string}</h1>
      <p>{new Date(publishDate as string).toLocaleDateString()}</p>
      <div>
        {tags && (tags as any[]).map((tag: any) => (
          <Link key={tag.sys.id} href={`/tags/${tag.fields.slug}`}>
            <span style={{ marginRight: '10px', backgroundColor: '#eee', padding: '5px' }}>
              {tag.fields.name}
            </span>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {documentToReactComponents(content as any)}
      </div>
    </div>
  );
}
