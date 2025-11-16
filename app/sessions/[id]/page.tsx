'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/session';
import { getSession, saveSession } from '@/lib/storage';
import { CardDisplay } from '@/components/session/CardDisplay';
import { Button } from '@/components/ui/Button';

interface SessionDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SessionDetailPage({ params }: SessionDetailPageProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => {
      setResolvedId(p.id);
      const loadedSession = getSession(p.id);
      setSession(loadedSession);
      setIsLoading(false);
    });
  }, [params]);

  const handleNextCard = () => {
    if (!session) return;

    if (session.currentCardIndex < session.cards.length - 1) {
      const updatedSession = {
        ...session,
        currentCardIndex: session.currentCardIndex + 1,
        updatedAt: new Date(),
      };
      saveSession(updatedSession);
      setSession(updatedSession);
    }
  };

  const handlePreviousCard = () => {
    if (!session) return;

    if (session.currentCardIndex > 0) {
      const updatedSession = {
        ...session,
        currentCardIndex: session.currentCardIndex - 1,
        updatedAt: new Date(),
      };
      saveSession(updatedSession);
      setSession(updatedSession);
    }
  };

  const handleReset = () => {
    if (!session) return;

    if (confirm('セッションを最初からやり直しますか？')) {
      const updatedSession = {
        ...session,
        currentCardIndex: 0,
        updatedAt: new Date(),
      };
      saveSession(updatedSession);
      setSession(updatedSession);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-500 mb-4">セッションが見つかりません</p>
          <Button onClick={() => router.push('/sessions')}>
            セッション一覧に戻る
          </Button>
        </div>
      </div>
    );
  }

  const currentCard = session.cards[session.currentCardIndex];
  const isFirstCard = session.currentCardIndex === 0;
  const isLastCard = session.currentCardIndex === session.cards.length - 1;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-900">{session.title}</h1>
            <Button variant="secondary" size="sm" onClick={() => router.push('/sessions')}>
              一覧に戻る
            </Button>
          </div>
          <p className="text-gray-600">{session.description}</p>
        </div>

        <CardDisplay
          card={currentCard}
          currentIndex={session.currentCardIndex}
          totalCards={session.cards.length}
        />

        <div className="mt-6 flex gap-4">
          <Button
            onClick={handlePreviousCard}
            disabled={isFirstCard}
            variant="secondary"
          >
            前のカード
          </Button>

          <Button
            onClick={handleNextCard}
            disabled={isLastCard}
            className="flex-1"
            size="lg"
          >
            {isLastCard ? '最後のカードです' : '次のカードを引く'}
          </Button>

          <Button
            onClick={handleReset}
            variant="secondary"
          >
            最初から
          </Button>
        </div>

        {isLastCard && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              セッション完了
            </h3>
            <p className="text-green-700 mb-4">
              すべてのカードを表示しました。お疲れ様でした！
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset}>
                もう一度プレイ
              </Button>
              <Button variant="secondary" onClick={() => router.push('/sessions')}>
                セッション一覧に戻る
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
