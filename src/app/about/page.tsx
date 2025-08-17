import commonStyles from '../common-page.module.css';

export default function About() {
  return (
    <div className={commonStyles.pageContainer}>
      <h1 className={commonStyles.pageTitle}>About</h1>
      <div className={commonStyles.pageContent}>
        <h2>自己紹介</h2>
        <p>高専3年生のプログラマーです。</p>
        <h3>技術</h3>
        <dl>
          <dt>C#</dt>
          <dd>最も得意な言語です。6年以上の経験があります。</dd>
          <dt>Unity</dt>
          <dd>ゲーム開発に使用しています。C#同様、6年以上の経験があります。</dd>
          <dt>TypeScript</dt>
          <dd>最近勉強しています。制御構文や基礎的な型システムを理解しています。</dd>
          <dt>HTML, CSS</dt>
          <dd>Web開発に使用しています。</dd>
          <dt>C</dt>
          <dd>授業で使用しました。ポインタ、構造体など基礎的な知識があります。</dd>
          <dt>Git</dt>
          <dd>基本的な操作ができます。またGitHubを利用してプロジェクトを管理しています。</dd>
          <dt>Vim</dt>
          <dd>Vimmerです。</dd>
          <dt>その他</dt>
          <dd>Python, vbs, vba, bashなどを使用したことがあります。</dd>
        </dl>

        <h3>実績</h3>
        <dl>
          <dt>AtCoder</dt>
          <dd>Algorithmで緑色、Heuristicで水色です。<a href='https://atcoder.jp/users/PolyChrome'>AtCoderのプロフィール</a></dd>
          <dt>ハックツハッカソン</dt>
          <dd>ハックツハッカソンに部活のチームで参加しました。ティラノカップで最優秀賞、ステゴカップで優秀賞を獲得しました。</dd>
        </dl>
      </div>
    </div>
  );
}