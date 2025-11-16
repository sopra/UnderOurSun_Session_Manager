'use client';

import Link from 'next/link';
import { useSessions } from '@/hooks/useSession';
import { SessionList } from '@/components/session/SessionList';
import { Button } from '@/components/ui/Button';
import { resetToPresets } from '@/lib/storage';

export default function SessionsPage() {
  const { sessions, isLoading, removeSession } = useSessions();

  const handleResetPresets = () => {
    if (confirm('すべてのセッションを削除して、プリセットをリセットしますか？この操作は取り消せません。')) {
      resetToPresets();
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">セッション一覧</h1>
        <div className="flex gap-4">
          <Button variant="secondary" onClick={handleResetPresets}>
            プリセットをリセット
          </Button>
          <Link href="/sessions/new">
            <Button>新規作成</Button>
          </Link>
        </div>
      </div>

      <SessionList sessions={sessions} onDelete={removeSession} />
    </div>
  );
}
