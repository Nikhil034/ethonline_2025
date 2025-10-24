// lib/types.ts - Type Definitions

export interface User {
  id: string;
  address: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface YellowSession {
  id: string;
  address: string;
  startTime: number;
  endTime?: number;
  allowance: number;
  spent: number;
  transactionCount: number;
  active: boolean;
}

export interface OffChainTransaction {
  id: string;
  sessionId: string;
  from: string;
  to: string;
  amount: number;
  metadata: {
    reaction: string;
    type: 'tip' | 'payment';
    timestamp: number;
  };
  settled: boolean;
  settlementTxHash?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    qualityScore?: number;
    suggestedTip?: number;
    reasoning?: string;
  };
}

export interface ContentAnalysis {
  score: number;
  reasoning: string;
  suggestedTip: number;
}
