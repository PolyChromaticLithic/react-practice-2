import Link from 'next/link';
import client from '../../../lib/contentful';
import commonStyles from '../../common-page.module.css';
import tagPageStyles from './tags-page.module.css';

async function fetchAllTags() {
  const entries = await client.getEntries({
    content_type: 'tag',
    order: ['fields.name'],
  });
  return entries.items;
}

export default async function AllTagsPage() {
  const tags = await fetchAllTags();

  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>All Tags</h1>
      <ul className={tagPageStyles.tagList}>
        {tags.map((tag: any) => (
          <li key={tag.sys.id} className={tagPageStyles.tagListItem}>
            <Link href={`/blog/tags/${tag.fields.slug}`} className={tagPageStyles.tagLink}>
              {tag.fields.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}