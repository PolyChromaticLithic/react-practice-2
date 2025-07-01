
import Link from 'next/link';
import client from '../../lib/contentful';
import styles from './TagSidebar.module.css';

async function fetchAllTags() {
  const entries = await client.getEntries({ content_type: 'tag', order: ['fields.name'] });
  return entries.items;
}

export default async function TagSidebar() {
  const tags = await fetchAllTags();

  return (
    <aside className={styles.sidebarContainer}>
      <h2 className={styles.title}>Tags</h2>
      <ul className={styles.tagList}>
        {tags.map((tag: any) => (
          <li key={tag.sys.id}>
            <Link href={`/tags/${tag.fields.slug}`} className={styles.tagLink}>
              {tag.fields.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
