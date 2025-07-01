
import client from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

async function fetchBlogPost(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
  });
  return entries.items[0];
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await fetchBlogPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.fields.title as string}</h1>
      <p>{new Date(post.fields.publishDate as string).toLocaleDateString()}</p>
      <div>{documentToReactComponents(post.fields.content as any)}</div>
    </div>
  );
}
