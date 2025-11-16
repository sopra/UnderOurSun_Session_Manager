'use client';

import Link from 'next/link';
import { useSessions } from '@/hooks/useSession';
import { SessionList } from '@/components/session/SessionList';
import { Button } from '@/components/ui/Button';

export default function SessionsPage() {
  const { sessions, isLoading, removeSession } = useSessions();

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
        <Link href="/sessions/new">
          <Button>新規作成</Button>
        </Link>
      </div>

      <SessionList sessions={sessions} onDelete={removeSession} />
    </div>
  );
}
