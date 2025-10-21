// Type definitions for Yellow Instant Tip App

export interface User {
  address: string;
  name?: string;
  avatar?: string;
  balance: string;
}

export interface Session {
  id: string;
  userAddress: string;
  startTime: number;
  endTime?: number;
  status: 'active' | 'ended' | 'settled';
  offChainBalance: string;
  totalTransactions: number;
}

export interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  timestamp: number;
  type: 'off-chain' | 'on-chain';
  status: 'pending' | 'confirmed' | 'failed';
  hash?: string;
}

export interface Tip {
  id: string;
  from: string;
  to: string;
  amount: string;
  message?: string;
  timestamp: number;
  status: 'pending' | 'sent' | 'received';
}

export interface SessionStats {
  totalTips: number;
  totalAmount: string;
  averageTip: string;
  topRecipients: Array<{
    address: string;
    amount: string;
    count: number;
  }>;
}

export interface YellowSDKConfig {
  network: string;
  rpcUrl: string;
  chainId: number;
  sessionTimeout: number;
  maxOffChainBalance: string;
  supportedTokens: Record<string, {
    address: string;
    decimals: number;
    symbol: string;
    name: string;
  }>;
}

export interface WalletState {
  isConnected: boolean;
  address?: string;
  chainId?: number;
  balance?: string;
}

export interface AppState {
  user: User | null;
  session: Session | null;
  transactions: Transaction[];
  tips: Tip[];
  stats: SessionStats | null;
  isLoading: boolean;
  error: string | null;
}
