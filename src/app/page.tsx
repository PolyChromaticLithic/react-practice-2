import commonStyles from './common-page.module.css';

export default function Home() {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Welcome to Astarの素敵なホームページ</h1>
      <div className={commonStyles.pageContent}>
        <p>このサイトはAstarのポートフォリオサイトです。</p>
      </div>
    </div>
  );
}