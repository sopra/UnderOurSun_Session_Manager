import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'UnderOurSun - Session Manager',
  description: 'ボードゲームシナリオのセッション管理アプリ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
      </body>
    </html>
  );
}
