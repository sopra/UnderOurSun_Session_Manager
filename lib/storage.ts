import { Session } from '@/types/session';
import { STORAGE_KEY } from './constants';

export function getSessions(): Session[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];

    const sessions = JSON.parse(data);
    return sessions.map((session: Session) => ({
      ...session,
      createdAt: new Date(session.createdAt),
      updatedAt: new Date(session.updatedAt),
    }));
  } catch (error) {
    console.error('Failed to load sessions:', error);
    return [];
  }
}

export function saveSession(session: Session): void {
  if (typeof window === 'undefined') return;

  try {
    const sessions = getSessions();
    const index = sessions.findIndex(s => s.id === session.id);

    if (index >= 0) {
      sessions[index] = session;
    } else {
      sessions.push(session);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
}

export function deleteSession(sessionId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const sessions = getSessions();
    const filtered = sessions.filter(s => s.id !== sessionId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete session:', error);
  }
}

export function getSession(sessionId: string): Session | null {
  const sessions = getSessions();
  return sessions.find(s => s.id === sessionId) || null;
}
