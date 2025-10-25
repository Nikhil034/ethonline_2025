// lib/types.ts - Type Definitions for Nitrolite Integration

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
  // Nitrolite specific fields
  channelId?: string;
  applicationId?: string;
  participants?: string[];
}

export interface OffChainTransaction {
  id: string;
  sessionId: string;
  from: string;
  to: string;
  amount: number;
  metadata: {
    creatorName: any;
    contentTitle: any;
    reaction: string;
    type: 'tip' | 'payment';
    timestamp: number;
    // Nitrolite specific fields
    stateUpdateId?: string;
    channelId?: string;
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

// Nitrolite SDK specific types
export interface NitroliteConfig {
  channelId: string;
  clearNodeUrl: string;
  authToken?: string;
}

export interface StateUpdate {
  type: 'payment' | 'tip' | 'settlement';
  from: string;
  to: string;
  amount: number;
  metadata: Record<string, any>;
}

export interface ApplicationSession {
  sessionId: string;
  applicationId: string;
  participants: string[];
  metadata: Record<string, any>;
  status: 'active' | 'closed' | 'settled';
}
