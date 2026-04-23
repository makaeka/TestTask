// src/components/Card/Card.types.ts
import { Card as CardType } from '@/types';

export interface CardProps {
  card: CardType;
  columnId: string;
  index: number;
}