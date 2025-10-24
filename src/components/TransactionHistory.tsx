'use client';

import { useState, useEffect } from 'react';
import { SessionManager } from '../lib/sessionManager';
import { Transaction, Tip, SessionStats } from '../lib/types';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle, 
  XCircle, 
  DollarSign,
  TrendingUp,
  Users,
  Award,
  Heart
} from 'lucide-react';

interface TransactionHistoryProps {
  sessionManager: SessionManager;
  stats: SessionStats | null;
}

export default function TransactionHistory({ sessionManager, stats }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [tips, setTips] = useState<Tip[]>([]);
  const [activeTab, setActiveTab] = useState<'transactions' | 'tips' | 'stats'>('transactions');

  useEffect(() => {
    // Update data periodically
    const interval = setInterval(() => {
      setTransactions(sessionManager.getTransactions());
      setTips(sessionManager.getTips());
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionManager]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'sent':
      case 'received':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Transaction History
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your off-chain transactions and tips
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'transactions'
              ? 'text-yellow-600 border-b-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Transactions ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'tips'
              ? 'text-yellow-600 border-b-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Tips ({tips.length})
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === 'stats'
              ? 'text-yellow-600 border-b-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
          }`}
        >
          Statistics
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'transactions' && (
          <div className="space-y-4">
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No transactions yet
                </p>
              </div>
            ) : (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {tx.type === 'off-chain' ? (
                      <ArrowUpRight className="w-5 h-5 text-blue-500" />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-green-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tx.type === 'off-chain' ? 'Off-Chain' : 'On-Chain'} Transaction
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        To: {formatAddress(tx.to)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${tx.amount} {tx.token}
                    </p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(tx.status)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(tx.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-4">
            {tips.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No tips sent yet
                </p>
              </div>
            ) : (
              tips.map((tip) => (
                <div
                  key={tip.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Tip to {formatAddress(tip.to)}
                      </p>
                      {tip.message && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          "{tip.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      ${tip.amount}
                    </p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(tip.status)}
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(tip.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            {!stats ? (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  No statistics available yet
                </p>
              </div>
            ) : (
              <>
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Total Tips
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {stats.totalTips}
                    </p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">
                        Total Amount
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                      ${stats.totalAmount}
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Average Tip
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      ${stats.averageTip}
                    </p>
                  </div>
                </div>

                {/* Top Recipients */}
                {stats.topRecipients.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Top Recipients
                    </h3>
                    <div className="space-y-3">
                      {stats.topRecipients.map((recipient, index) => (
                        <div
                          key={recipient.address}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {index + 1}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {formatAddress(recipient.address)}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {recipient.count} tips
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${recipient.amount}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
