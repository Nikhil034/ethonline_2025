import { Session, Transaction, Tip, SessionStats } from './types';

// Session Manager for handling off-chain transactions
export class SessionManager {
  private session: Session | null = null;
  private transactions: Transaction[] = [];
  private tips: Tip[] = [];

  // Create a new session
  createSession(userAddress: string): Session {
    const session: Session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userAddress,
      startTime: Date.now(),
      status: 'active',
      offChainBalance: '0',
      totalTransactions: 0,
    };

    this.session = session;
    return session;
  }

  // End current session
  endSession(): Session | null {
    if (!this.session) return null;

    this.session.endTime = Date.now();
    this.session.status = 'ended';
    
    return this.session;
  }

  // Get current session
  getCurrentSession(): Session | null {
    return this.session;
  }

  // Add off-chain transaction
  addOffChainTransaction(
    from: string,
    to: string,
    amount: string,
    token: string = 'USDC'
  ): Transaction {
    const transaction: Transaction = {
      id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      from,
      to,
      amount,
      token,
      timestamp: Date.now(),
      type: 'off-chain',
      status: 'confirmed',
    };

    this.transactions.push(transaction);
    
    if (this.session) {
      this.session.totalTransactions++;
      this.session.offChainBalance = (
        parseFloat(this.session.offChainBalance) + parseFloat(amount)
      ).toString();
    }

    return transaction;
  }

  // Add tip
  addTip(
    from: string,
    to: string,
    amount: string,
    message?: string
  ): Tip {
    const tip: Tip = {
      id: `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      from,
      to,
      amount,
      message,
      timestamp: Date.now(),
      status: 'sent',
    };

    this.tips.push(tip);
    return tip;
  }

  // Get all transactions
  getTransactions(): Transaction[] {
    return this.transactions;
  }

  // Get all tips
  getTips(): Tip[] {
    return this.tips;
  }

  // Get session statistics
  getSessionStats(): SessionStats {
    const totalTips = this.tips.length;
    const totalAmount = this.tips.reduce((sum, tip) => sum + parseFloat(tip.amount), 0).toString();
    const averageTip = totalTips > 0 ? (parseFloat(totalAmount) / totalTips).toString() : '0';

    // Calculate top recipients
    const recipientMap = new Map<string, { amount: number; count: number }>();
    
    this.tips.forEach(tip => {
      const existing = recipientMap.get(tip.to) || { amount: 0, count: 0 };
      recipientMap.set(tip.to, {
        amount: existing.amount + parseFloat(tip.amount),
        count: existing.count + 1,
      });
    });

    const topRecipients = Array.from(recipientMap.entries())
      .map(([address, data]) => ({
        address,
        amount: data.amount.toString(),
        count: data.count,
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    return {
      totalTips,
      totalAmount,
      averageTip,
      topRecipients,
    };
  }

  // Clear session data
  clearSession(): void {
    this.session = null;
    this.transactions = [];
    this.tips = [];
  }

  // Check if session is active
  isSessionActive(): boolean {
    return this.session?.status === 'active';
  }

  // Get session duration in minutes
  getSessionDuration(): number {
    if (!this.session || !this.session.endTime) return 0;
    return Math.floor((this.session.endTime - this.session.startTime) / (1000 * 60));
  }
}
