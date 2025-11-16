import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          UnderOurSun
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ボードゲームのシナリオをカード形式で管理・表示するアプリケーション
        </p>
        <p className="text-gray-700 mb-12 max-w-2xl mx-auto">
          物理的なボードゲームを進行しながら、アプリ上でストーリーカードを1枚ずつ表示。
          セッションを作成して、自分だけのゲーム体験を記録しましょう。
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/sessions">
            <Button size="lg">
              セッション一覧を見る
            </Button>
          </Link>
          <Link href="/sessions/new">
            <Button variant="secondary" size="lg">
              新規セッション作成
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">カード形式の表示</h3>
            <p className="text-gray-600">
              ストーリー、イベント、セットアップを1枚ずつカード形式で表示
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">セッション管理</h3>
            <p className="text-gray-600">
              複数のシナリオを作成・保存して、いつでも続きから再開可能
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">進行状況の保存</h3>
            <p className="text-gray-600">
              現在のカード位置を自動保存。次回も安心して続けられます
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
