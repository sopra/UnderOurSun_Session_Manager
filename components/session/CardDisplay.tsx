'use client';

import { Card as CardType } from '@/types/card';
import { Card } from '@/components/ui/Card';

interface CardDisplayProps {
  card: CardType;
  currentIndex: number;
  totalCards: number;
}

export function CardDisplay({ card, currentIndex, totalCards }: CardDisplayProps) {
  const isSetup = card.type === 'setup';

  return (
    <div className="min-h-[600px] flex flex-col">
      <div className="mb-4 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
          {card.type === 'setup' && 'セットアップカード'}
          {card.type === 'story' && 'ストーリー'}
          {card.type === 'event' && 'イベント'}
        </span>
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {totalCards}
        </span>
      </div>

      <Card className="flex-grow">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">{card.content.title}</h2>

        {card.content.story && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">ストーリー</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{card.content.story}</p>
          </div>
        )}

        {isSetup && card.content.components && card.content.components.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">準備するコンポーネント</h3>
            <ul className="list-disc list-inside space-y-1">
              {card.content.components.map((component, idx) => (
                <li key={idx} className="text-gray-700">{component}</li>
              ))}
            </ul>
          </div>
        )}

        {isSetup && card.content.setupSteps && card.content.setupSteps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">セットアップ手順</h3>
            <ol className="list-decimal list-inside space-y-2">
              {card.content.setupSteps.map((step, idx) => (
                <li key={idx} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {isSetup && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {card.content.winCondition && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-1">クリア条件</h4>
                <p className="text-green-700 text-sm">{card.content.winCondition}</p>
              </div>
            )}
            {card.content.loseCondition && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-1">ゲームオーバー条件</h4>
                <p className="text-red-700 text-sm">{card.content.loseCondition}</p>
              </div>
            )}
          </div>
        )}

        {card.content.nextCondition && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-1">次のカードを引く条件</h4>
            <p className="text-blue-700">{card.content.nextCondition}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
