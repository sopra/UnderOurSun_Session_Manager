'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/session';
import { Card, CardContent, CardType } from '@/types/card';
import { getSession, saveSession } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { CardEditor } from '@/components/session/CardEditor';
import { Button } from '@/components/ui/Button';

interface CardsEditPageProps {
  params: Promise<{ id: string }>;
}

export default function CardsEditPage({ params }: CardsEditPageProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => {
      setResolvedId(p.id);
      const loadedSession = getSession(p.id);
      setSession(loadedSession);
      setIsLoading(false);
    });
  }, [params]);

  const handleCardChange = (content: CardContent) => {
    if (!session) return;

    const updatedCards = [...session.cards];
    updatedCards[currentCardIndex] = {
      ...updatedCards[currentCardIndex],
      content,
    };

    setSession({
      ...session,
      cards: updatedCards,
    });
  };

  const handleAddCard = () => {
    if (!session) return;

    const newCard: Card = {
      id: generateId(),
      sessionId: session.id,
      order: session.cards.length,
      type: 'story' as CardType,
      content: {
        title: '',
        story: '',
        nextCondition: '',
      },
    };

    const updatedSession = {
      ...session,
      cards: [...session.cards, newCard],
    };

    setSession(updatedSession);
    setCurrentCardIndex(updatedSession.cards.length - 1);
  };

  const handleDeleteCard = () => {
    if (!session || session.cards.length <= 1) return;

    const updatedCards = session.cards.filter((_, idx) => idx !== currentCardIndex);
    const reorderedCards = updatedCards.map((card, idx) => ({
      ...card,
      order: idx,
    }));

    setSession({
      ...session,
      cards: reorderedCards,
    });

    if (currentCardIndex >= reorderedCards.length) {
      setCurrentCardIndex(reorderedCards.length - 1);
    }
  };

  const handleSave = () => {
    if (!session) return;

    const updatedSession = {
      ...session,
      updatedAt: new Date(),
    };

    saveSession(updatedSession);
    router.push('/sessions');
  };

  const handleNavigateCard = (index: number) => {
    if (index >= 0 && index < (session?.cards.length || 0)) {
      setCurrentCardIndex(index);
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

  const currentCard = session.cards[currentCardIndex];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
              <p className="text-gray-600">カード編集</p>
            </div>
            <Button variant="secondary" onClick={() => router.push('/sessions')}>
              一覧に戻る
            </Button>
          </div>

          {/* カードナビゲーション */}
          {session.cards.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {session.cards.map((card, idx) => (
                <button
                  key={card.id}
                  onClick={() => handleNavigateCard(idx)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    idx === currentCardIndex
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  カード {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <CardEditor
          card={currentCard}
          cardIndex={currentCardIndex}
          totalCards={session.cards.length}
          onChange={handleCardChange}
          onAddCard={handleAddCard}
          onDeleteCard={handleDeleteCard}
          onSave={handleSave}
        />

        {/* カード間ナビゲーション */}
        {session.cards.length > 1 && (
          <div className="mt-6 flex gap-4">
            <Button
              variant="secondary"
              onClick={() => handleNavigateCard(currentCardIndex - 1)}
              disabled={currentCardIndex === 0}
              className="flex-1"
            >
              前のカード
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleNavigateCard(currentCardIndex + 1)}
              disabled={currentCardIndex === session.cards.length - 1}
              className="flex-1"
            >
              次のカード
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
