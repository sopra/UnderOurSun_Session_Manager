export type CardType = 'setup' | 'story' | 'event';

export interface CardContent {
  title: string;
  story?: string;
  components?: string[];
  setupSteps?: string[];
  winCondition?: string;
  loseCondition?: string;
  nextCondition?: string;
}

export interface Card {
  id: string;
  sessionId: string;
  order: number;
  type: CardType;
  content: CardContent;
}
