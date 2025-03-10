import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Astarの素敵なホームページ</h1>
      <p className={styles.description}>このサイトはAstarのポートフォリオサイトです。</p>
    </div>
  )
} 