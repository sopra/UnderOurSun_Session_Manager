import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
            UnderOurSun
          </Link>
          <nav className="flex gap-6">
            <Link href="/sessions" className="text-gray-700 hover:text-blue-600 transition-colors">
              セッション一覧
            </Link>
            <Link href="/sessions/new" className="text-gray-700 hover:text-blue-600 transition-colors">
              新規作成
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
