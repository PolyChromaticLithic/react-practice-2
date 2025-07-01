import commonStyles from '../common-page.module.css';

export default function About() {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>About</h1>
      <div className={commonStyles.pageContent}>
        <p>このページは準備中です。</p>
      </div>
    </div>
  );
}