import { Card } from './card';

export interface Session {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  currentCardIndex: number;
  cards: Card[];
}
