'use client';

import Link from 'next/link';
import { Session } from '@/types/session';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

interface SessionListProps {
  sessions: Session[];
  onDelete: (sessionId: string) => void;
}

export function SessionList({ sessions, onDelete }: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">まだセッションがありません</p>
        <Link href="/sessions/new">
          <Button>最初のセッションを作成</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map(session => (
        <Card key={session.id} className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{session.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{session.description}</p>

          <div className="text-sm text-gray-500 mb-4">
            <p>カード: {session.currentCardIndex + 1} / {session.cards.length}</p>
            <p>更新: {formatDate(session.updatedAt)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex gap-2">
              <Link href={`/sessions/${session.id}`} className="flex-1">
                <Button className="w-full">続きから開始</Button>
              </Link>
              <Button
                variant="danger"
                onClick={() => {
                  if (confirm('本当に削除しますか？')) {
                    onDelete(session.id);
                  }
                }}
              >
                削除
              </Button>
            </div>
            <div className="flex gap-2">
              <Link href={`/sessions/${session.id}/edit`} className="flex-1">
                <Button variant="secondary" className="w-full">編集</Button>
              </Link>
              <Link href={`/sessions/${session.id}/cards`} className="flex-1">
                <Button variant="secondary" className="w-full">カード編集</Button>
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
