'use client';

import { Card as CardType, CardContent } from '@/types/card';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface CardEditorProps {
  card: CardType;
  cardIndex: number;
  totalCards: number;
  onChange: (content: CardContent) => void;
  onAddCard: () => void;
  onDeleteCard: () => void;
  onSave: () => void;
}

export function CardEditor({
  card,
  cardIndex,
  totalCards,
  onChange,
  onAddCard,
  onDeleteCard,
  onSave,
}: CardEditorProps) {
  const isSetup = card.type === 'setup';

  const updateField = (field: keyof CardContent, value: string | string[]) => {
    onChange({
      ...card.content,
      [field]: value,
    });
  };

  const updateArrayField = (field: 'components' | 'setupSteps', index: number, value: string) => {
    const array = card.content[field] || [];
    const newArray = [...array];
    newArray[index] = value;
    updateField(field, newArray);
  };

  const addArrayItem = (field: 'components' | 'setupSteps') => {
    const array = card.content[field] || [];
    updateField(field, [...array, '']);
  };

  const removeArrayItem = (field: 'components' | 'setupSteps', index: number) => {
    const array = card.content[field] || [];
    updateField(field, array.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          カード {cardIndex + 1} / {totalCards}
        </h2>
        <div className="text-sm text-gray-600">
          タイプ: {card.type === 'setup' ? 'セットアップ' : card.type === 'story' ? 'ストーリー' : 'イベント'}
        </div>
      </div>

      <Card>
        <div className="space-y-6">
          {/* タイトル */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              タイトル
            </label>
            <input
              type="text"
              value={card.content.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="カードのタイトル"
              required
            />
          </div>

          {/* ストーリー */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ストーリー
            </label>
            <textarea
              value={card.content.story || ''}
              onChange={(e) => updateField('story', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
              placeholder="ストーリーの内容を入力"
            />
          </div>

          {/* セットアップカードの特別フィールド */}
          {isSetup && (
            <>
              {/* 準備するコンポーネント */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  準備するコンポーネント
                </label>
                <div className="space-y-2">
                  {(card.content.components || []).map((component, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={component}
                        onChange={(e) => updateArrayField('components', idx, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`コンポーネント ${idx + 1}`}
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem('components', idx)}
                      >
                        削除
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addArrayItem('components')}
                  >
                    + コンポーネントを追加
                  </Button>
                </div>
              </div>

              {/* セットアップ手順 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  セットアップ手順
                </label>
                <div className="space-y-2">
                  {(card.content.setupSteps || []).map((step, idx) => (
                    <div key={idx} className="flex gap-2">
                      <div className="flex items-center justify-center w-8 h-10 text-gray-600 font-semibold">
                        {idx + 1}.
                      </div>
                      <input
                        type="text"
                        value={step}
                        onChange={(e) => updateArrayField('setupSteps', idx, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`手順 ${idx + 1}`}
                      />
                      <Button
                        type="button"
                        variant="danger"
                        size="sm"
                        onClick={() => removeArrayItem('setupSteps', idx)}
                      >
                        削除
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => addArrayItem('setupSteps')}
                  >
                    + 手順を追加
                  </Button>
                </div>
              </div>

              {/* クリア条件 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  クリア条件
                </label>
                <input
                  type="text"
                  value={card.content.winCondition || ''}
                  onChange={(e) => updateField('winCondition', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ゲームのクリア条件"
                />
              </div>

              {/* ゲームオーバー条件 */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ゲームオーバー条件
                </label>
                <input
                  type="text"
                  value={card.content.loseCondition || ''}
                  onChange={(e) => updateField('loseCondition', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ゲームオーバーとなる条件"
                />
              </div>
            </>
          )}

          {/* 次のカードを引く条件 */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              次のカードを引く条件（オプション）
            </label>
            <input
              type="text"
              value={card.content.nextCondition || ''}
              onChange={(e) => updateField('nextCondition', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="次のカードを引くための条件"
            />
          </div>
        </div>
      </Card>

      {/* アクションボタン */}
      <div className="flex gap-4">
        <Button onClick={onSave} size="lg" className="flex-1">
          保存する
        </Button>
        <Button onClick={onAddCard} variant="secondary" size="lg">
          カードを追加
        </Button>
        {totalCards > 1 && (
          <Button
            onClick={() => {
              if (confirm('このカードを削除しますか？')) {
                onDeleteCard();
              }
            }}
            variant="danger"
            size="lg"
          >
            カードを削除
          </Button>
        )}
      </div>
    </div>
  );
}
