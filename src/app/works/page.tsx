import commonStyles from '../common-page.module.css';

export default function Works() {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>Works</h1>
      <div className={commonStyles.pageContent}>
        <a href="/works/fizzbuzz" className={commonStyles.link}>
          <h2>Fizzbuzz</h2>
          <p>Click to play the Fizzbuzz game.</p>
        </a>
      </div>
    </div>
  );
}