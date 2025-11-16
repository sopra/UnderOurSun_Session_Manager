'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Session } from '@/types/session';
import { CardType } from '@/types/card';
import { generateId } from '@/lib/utils';
import { saveSession } from '@/lib/storage';

export default function NewSessionPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sampleSession: Session = {
      id: generateId(),
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentCardIndex: 0,
      cards: [
        {
          id: generateId(),
          sessionId: '',
          order: 0,
          type: 'setup' as CardType,
          content: {
            title: 'セットアップ',
            story: 'これはサンプルシナリオです。実際のゲームでは、ここにストーリーの概要が表示されます。',
            components: ['メインボード', 'プレイヤーコマ', 'リソースカード'],
            setupSteps: [
              'メインボードをテーブル中央に配置',
              '各プレイヤーにコマを配布',
              'リソースカードをシャッフルして山札を作成',
            ],
            winCondition: '10ポイント先取',
            loseCondition: 'リソースが0になる',
            nextCondition: 'セットアップが完了したら次のカードを引く',
          },
        },
        {
          id: generateId(),
          sessionId: '',
          order: 1,
          type: 'story' as CardType,
          content: {
            title: 'ストーリーカード1',
            story: 'あなたたちは古代遺跡の入り口に立っています。扉には謎の文字が刻まれています。',
            nextCondition: '扉を開けたら次のカードを引く',
          },
        },
        {
          id: generateId(),
          sessionId: '',
          order: 2,
          type: 'event' as CardType,
          content: {
            title: 'イベント: 罠の発動',
            story: '扉を開けた瞬間、床が崩れ始めます。素早く行動しなければなりません。',
            nextCondition: '全員が安全な場所に移動したら次のカードを引く',
          },
        },
      ],
    };

    sampleSession.cards = sampleSession.cards.map(card => ({
      ...card,
      sessionId: sampleSession.id,
    }));

    saveSession(sampleSession);
    router.push('/sessions');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">新規セッション作成</h1>

        <Card>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                タイトル
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="シナリオのタイトルを入力"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                説明
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                placeholder="シナリオの説明を入力"
                required
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                現在はサンプルカードが自動的に追加されます。将来的にカードエディターを実装予定です。
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                作成
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
              >
                キャンセル
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
