import Link from 'next/link';
import client from '../../../lib/contentful';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import blogSpecificStyles from '../blog-specific.module.css';
import commonStyles from '../../common-page.module.css';
import TagSidebar from '../../../components/TagSidebar';

const renderOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const { file } = node.data.target.fields;
      const { url } = file;
      const { width, height } = file.details.image;
      return (
        <Image src={`https:${url}`} alt={file.fileName} width={width} height={height} />
      );
    },
  },
};

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
            <Link key={tag.sys.id} href={`/blog/tags/${tag.fields.slug}`}>
              <span className={blogSpecificStyles.tag}>
                {tag.fields.name}
              </span>
            </Link>
          ))}
        </div>
        <div className={commonStyles.pageContent} style={{ marginTop: '2rem' }}>
          {documentToReactComponents(content as any, renderOptions)}
        </div>
      </div>
      <TagSidebar />
    </div>
  );
}