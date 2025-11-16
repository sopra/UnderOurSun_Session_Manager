import { Session } from '@/types/session';
import { STORAGE_KEY } from './constants';
import { createPresetSessions } from './presets';

const PRESET_INITIALIZED_KEY = 'underoursun_presets_initialized';

export function getSessions(): Session[] {
  if (typeof window === 'undefined') return [];

  try {
    // 初回起動時にプリセットを初期化
    const isInitialized = localStorage.getItem(PRESET_INITIALIZED_KEY);
    if (!isInitialized) {
      initializePresets();
    }

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

function initializePresets(): void {
  try {
    const presets = createPresetSessions();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    localStorage.setItem(PRESET_INITIALIZED_KEY, 'true');
  } catch (error) {
    console.error('Failed to initialize presets:', error);
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

export function resetToPresets(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(PRESET_INITIALIZED_KEY);
    localStorage.removeItem(STORAGE_KEY);
    // 次回getSessions()時に自動的にプリセットが再初期化される
  } catch (error) {
    console.error('Failed to reset presets:', error);
  }
}
