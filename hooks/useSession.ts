'use client';

import { useState, useEffect } from 'react';
import { Session } from '@/types/session';
import { getSessions, saveSession, deleteSession } from '@/lib/storage';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedSessions = getSessions();
    setSessions(loadedSessions);
    setIsLoading(false);
  }, []);

  const addSession = (session: Session) => {
    saveSession(session);
    setSessions(prev => [...prev, session]);
  };

  const updateSession = (session: Session) => {
    saveSession(session);
    setSessions(prev => prev.map(s => s.id === session.id ? session : s));
  };

  const removeSession = (sessionId: string) => {
    deleteSession(sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  return {
    sessions,
    isLoading,
    addSession,
    updateSession,
    removeSession,
  };
}
