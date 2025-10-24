'use client';

import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnect } from '../components/WalletConnect';
import { AIAssistant } from '@/components/AIAssistant';
import { Zap, Bot, Brain, Sparkles, Send, History } from 'lucide-react';
import { yellowSDK } from '../lib/yellowConfig';
import { MOCK_USERS, REACTIONS, TIP_AMOUNT } from '@/lib/constants';
import { YellowSession, OffChainTransaction, User } from '@/lib/types';

export default function HomePage() {
  const { address, isConnected } = useAccount();
  const [session, setSession] = useState<YellowSession | null>(null);
  const [activeTab, setActiveTab] = useState<'tip' | 'ai' | 'history'>('tip');
  const [transactions, setTransactions] = useState<OffChainTransaction[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedReaction, setSelectedReaction] = useState(REACTIONS[0]);
  const [loading, setLoading] = useState(false);

  // Create Yellow session
  const createSession = async () => {
    if (!address) return;
    
    setLoading(true);
    try {
      await yellowSDK.connect(address);
      const newSession = await yellowSDK.createSession(address, 50);
      setSession(newSession);
    } catch (error) {
      console.error('Failed to create session:', error);
    } finally {
      setLoading(false);
    }
  };

  // Send tip
  const sendTip = async (toUser: User) => {
    if (!address || !session) return;
    
    setLoading(true);
    try {
      const tx = await yellowSDK.sendOffChain(
        address,
        toUser.address,
        TIP_AMOUNT,
        { reaction: selectedReaction, type: 'tip' }
      );
      
      setTransactions(prev => [tx, ...prev]);
      setSession(yellowSDK.getSession());
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to send tip:', error);
      alert('Failed to send tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Settle session
  const settleSession = async () => {
    if (!session) return;
    
    setLoading(true);
    try {
      const txHash = await yellowSDK.settleSession(session.id);
      setTransactions(prev => 
        prev.map(tx => ({ ...tx, settled: true, settlementTxHash: txHash }))
      );
      setSession(yellowSDK.getSession());
      alert('Session settled successfully! TX: ' + txHash.slice(0, 10) + '...');
    } catch (error) {
      console.error('Failed to settle:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-create session when wallet connects
  React.useEffect(() => {
    if (isConnected && address && !session) {
      createSession();
    }
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-purple-600 bg-clip-text text-transparent">
                  InstaTip AI
                </h1>
                <p className="text-xs text-gray-600 flex items-center gap-2">
                  <span>Yellow Network</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Brain className="w-3 h-3" />
                    ASI Alliance
                  </span>
                </p>
              </div>
            </div>
            <WalletConnect />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          /* Welcome Screen */
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 via-orange-500 to-purple-500 rounded-3xl mb-6 shadow-2xl">
              <Zap className="w-14 h-14 text-white" />
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to InstaTip AI
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              AI-powered instant tipping with zero gas fees
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                Yellow Network
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold">
                <Brain className="w-4 h-4" />
                ASI Alliance
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Instant Payments</h3>
                <p className="text-sm text-gray-600">
                  Send tips in milliseconds using Yellow Network's Nitrolite protocol
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">💸</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Zero Gas Fees</h3>
                <p className="text-sm text-gray-600">
                  All tips are free off-chain. Settle once when ready
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-purple-200 shadow-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">AI Assistant</h3>
                <p className="text-sm text-gray-600">
                  Chat with AI to analyze content and get smart tipping suggestions
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Smart Reasoning</h3>
                <p className="text-sm text-gray-600">
                  MeTTa-powered logic ensures quality, fairness, and security
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-500 rounded-2xl p-1">
              <div className="bg-white rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-6">How It Works</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { num: 1, title: 'Connect', desc: 'Link your wallet' },
                    { num: 2, title: 'Ask AI', desc: 'Get smart suggestions' },
                    { num: 3, title: 'Tip Instantly', desc: 'Send in < 1 second' },
                    { num: 4, title: 'Settle', desc: 'Finalize on-chain' }
                  ].map(step => (
                    <div key={step.num} className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl shadow-lg">
                        {step.num}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* App Interface */
          <div className="space-y-6">
            {/* Session Info */}
            {session && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${session.active ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {session.active ? 'Active Session' : 'Session Ended'}
                      </h3>
                      <p className="text-sm text-gray-600">ID: {session.id.slice(0, 20)}...</p>
                    </div>
                  </div>
                  {session.active && transactions.length > 0 && (
                    <button
                      onClick={settleSession}
                      disabled={loading}
                      className="bg-white hover:bg-gray-50 text-gray-900 font-medium px-4 py-2 rounded-lg transition-all border border-gray-200 disabled:opacity-50"
                    >
                      {loading ? 'Settling...' : 'Settle On-Chain'}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-gray-600 mb-1">Allowance</p>
                    <p className="text-xl font-bold text-gray-900">${session.allowance}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-gray-600 mb-1">Spent</p>
                    <p className="text-xl font-bold text-orange-600">${session.spent.toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-gray-600 mb-1">Remaining</p>
                    <p className="text-xl font-bold text-green-600">${(session.allowance - session.spent).toFixed(2)}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-gray-600 mb-1">Tips Sent</p>
                    <p className="text-xl font-bold text-blue-600">{session.transactionCount}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2">
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setActiveTab('tip')}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'tip'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Send className="w-5 h-5" />
                  <span className="hidden sm:inline">Send Tips</span>
                </button>

                <button
                  onClick={() => setActiveTab('ai')}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'ai'
                      ? 'bg-gradient-to-r from-purple-400 to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  <span className="hidden sm:inline">AI Assistant</span>
                </button>

                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <History className="w-5 h-5" />
                  <span className="hidden sm:inline">History</span>
                </button>
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'tip' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Users */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Send Tips</h3>
                  <div className="space-y-3">
                    {MOCK_USERS.map(user => (
                      <button
                        key={user.id}
                        onClick={() => setSelectedUser(user)}
                        className="w-full flex items-center gap-3 p-4 bg-gray-50 hover:bg-yellow-50 rounded-xl transition-all border hover:border-yellow-200"
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                          {user.avatar}
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tip Config */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Configure Tip</h3>
                  {selectedUser ? (
                    <div className="space-y-6">
                      <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                        <p className="text-sm text-gray-600 mb-2">Sending to:</p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-xl">
                            {selectedUser.avatar}
                          </div>
                          <p className="font-bold text-gray-900">{selectedUser.name}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Select Reaction:</p>
                        <div className="grid grid-cols-4 gap-3">
                          {REACTIONS.map(reaction => (
                            <button
                              key={reaction}
                              onClick={() => setSelectedReaction(reaction)}
                              className={`aspect-square p-3 rounded-xl text-3xl transition-all ${
                                selectedReaction === reaction
                                  ? 'bg-yellow-400 scale-110 shadow-lg'
                                  : 'bg-gray-100 hover:bg-gray-200'
                              }`}
                            >
                              {reaction}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <p className="text-2xl font-bold text-gray-900">${TIP_AMOUNT} USDC</p>
                        <p className="text-xs text-gray-500">⚡ Instant & Gas-Free</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedUser(null)}
                          className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => sendTip(selectedUser)}
                          disabled={loading || !session?.active}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-xl disabled:opacity-50"
                        >
                          {loading ? 'Sending...' : 'Send Tip'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Send className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">Select a user to tip</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'ai' && <AIAssistant />}

            {activeTab === 'history' && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-6">Transaction History</h3>
                {transactions.length === 0 ? (
                  <div className="text-center py-16">
                    <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {transactions.map(tx => (
                      <div key={tx.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="text-3xl">{tx.metadata.reaction}</div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">
                            {tx.from.slice(0, 10)}... → {tx.to.slice(0, 10)}...
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(tx.metadata.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">${tx.amount}</p>
                          <p className={`text-xs ${tx.settled ? 'text-green-600' : 'text-yellow-600'}`}>
                            {tx.settled ? '✓ Settled' : '⚡ Off-chain'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
