import Link from 'next/link';
import client from '../../../lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import blogSpecificStyles from '../blog-specific.module.css';
import commonStyles from '../../common-page.module.css';
import TagSidebar from '../../../components/TagSidebar';

async function fetchBlogPost(slug: string) {
  const entries = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    include: 2,
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
    <div className={blogSpecificStyles.blogLayout}>
      <div>
        <h1 className={blogSpecificStyles.title}>{title as string}</h1>
        <p className={blogSpecificStyles.postDate}>{new Date(publishDate as string).toLocaleDateString()}</p>
        <div className={blogSpecificStyles.tagContainer}>
          {tags && (tags as any[]).map((tag: any) => (
            <Link key={tag.sys.id} href={`/tags/${tag.fields.slug}`}>
              <span className={blogSpecificStyles.tag}>
                {tag.fields.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={commonStyles.pageContent} style={{ marginTop: '2rem' }}>
          {documentToReactComponents(content as any)}
        </div>
      </div>
      <TagSidebar />
    </div>
  );
}