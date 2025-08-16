import Link from 'next/link';
import client from '../../../lib/contentful';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import blogSpecificStyles from '../blog-specific.module.css';
import commonStyles from '../../common-page.module.css';
import TagSidebar from '../../../components/TagSidebar';
import SetNotFound from '../../../components/SetNotFound';
import CodeBlock from '../../../components/CodeBlock';

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
    return (
      <>
        <SetNotFound />
        <div className={commonStyles.pageContainer}>
          <h1 className={commonStyles.pageTitle}>Post Not Found</h1>
          <p className={commonStyles.pageContent}>The requested blog post could not be found.</p>
          <p className={commonStyles.pageContent}>
            View <Link href="/blog">all posts</Link>
          </p>
        </div>
      </>
    );
  }

  const { title, publishDate, contentMarkdown, tags } = post.fields;

  return (
    <div className={blogSpecificStyles.blogLayout}>
      <div>
        <h1 className={blogSpecificStyles.title}>{title as string}</h1>
        <p className={blogSpecificStyles.postDate}>{new Date(publishDate as string).toLocaleDateString()}</p>
        <div className={blogSpecificStyles.tagContainer}>
          {tags && (tags as any[]).map((tag: any) => (
            <Link key={tag.sys.id} href={`/blog/tags/${tag.fields.slug}`}>
              <span className={blogSpecificStyles.tag}>
                {tag.fields.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={commonStyles.pageContent} style={{ marginTop: '2rem' }}>
          <ReactMarkdown
            rehypePlugins={[rehypeHighlight]}
            components={{
              code: CodeBlock,
            }}
          >
            {contentMarkdown as string}
          </ReactMarkdown>
        </div>
      </div>
      <TagSidebar />
    </div>
  );
}