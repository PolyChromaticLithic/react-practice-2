import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import '../styles/iceberg.css';
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { NotFoundProvider } from '../context/NotFoundContext';

const notoSansJP = Noto_Sans_JP({
  weight: ['200', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Astarのホームページ',
  description: 'Astarのポートフォリオサイトです。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={notoSansJP.className}>
      <body>
        <NotFoundProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </NotFoundProvider>
      </body>
    </html>
  )
} 