import Link from 'next/link';
import client from '../../lib/contentful';
import blogSpecificStyles from './blog-specific.module.css';
import commonStyles from '../common-page.module.css';
import TagSidebar from '../../components/TagSidebar';

async function fetchBlogPosts() {
  const entries = await client.getEntries({ content_type: 'blogPost', include: 2, order: ['-fields.publishDate'] });
  return entries.items;
}

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <div className={blogSpecificStyles.blogLayout}>
      <div>
        <h1 className={commonStyles.pageTitle}>Blog</h1>
        <ul className={blogSpecificStyles.postList}>
          {posts.map((post: any) => (
            <li key={post.sys.id} className={blogSpecificStyles.postCard}>
              <Link href={`/blog/${post.fields.slug}`}>
                <h2 className={blogSpecificStyles.postTitle}>{post.fields.title}</h2>
                <p className={blogSpecificStyles.postDate}>{new Date(post.fields.publishDate).toLocaleDateString()}</p>
                <div className={blogSpecificStyles.tagContainer}>
                  {post.fields.tags && (post.fields.tags as any[]).map((tag: any) => (
                    <span key={tag.sys.id} className={blogSpecificStyles.tag}>
                      {tag.fields.name}
                    </span>
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <TagSidebar />
    </div>
  );
}