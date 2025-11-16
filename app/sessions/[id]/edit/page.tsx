'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Session } from '@/types/session';
import { getSession, saveSession } from '@/lib/storage';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface SessionEditPageProps {
  params: Promise<{ id: string }>;
}

export default function SessionEditPage({ params }: SessionEditPageProps) {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resolvedId, setResolvedId] = useState<string | null>(null);

  useEffect(() => {
    params.then(p => {
      setResolvedId(p.id);
      const loadedSession = getSession(p.id);
      if (loadedSession) {
        setSession(loadedSession);
        setTitle(loadedSession.title);
        setDescription(loadedSession.description);
      }
      setIsLoading(false);
    });
  }, [params]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    const updatedSession: Session = {
      ...session,
      title,
      description,
      updatedAt: new Date(),
    };

    saveSession(updatedSession);
    router.push('/sessions');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">セッション編集</h1>

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

            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                保存
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
