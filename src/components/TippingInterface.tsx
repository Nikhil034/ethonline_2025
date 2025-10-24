'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { SessionManager } from '../lib/sessionManager';
import { Tip } from '../lib/types';
import { Heart, Send, MessageCircle, DollarSign, User, Clock } from 'lucide-react';

interface TippingInterfaceProps {
  sessionManager: SessionManager;
  onTipSent: (tip: Tip) => void;
}

export default function TippingInterface({ sessionManager, onTipSent }: TippingInterfaceProps) {
  const { address, isConnected } = useAccount();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Predefined tip amounts
  const quickAmounts = ['0.01', '0.05', '0.10', '0.25', '0.50', '1.00'];

  // Send tip
  const sendTip = async () => {
    if (!address || !recipient || !amount || !sessionManager.isSessionActive()) return;

    setIsLoading(true);
    try {
      // Create tip
      const tip = sessionManager.addTip(address, recipient, amount, message);
      
      // Add to transaction history
      sessionManager.addOffChainTransaction(address, recipient, amount, 'USDC');
      
      // Notify parent component
      onTipSent(tip);
      
      // Reset form
      setRecipient('');
      setAmount('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send tip:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Quick tip actions
  const quickTip = (amount: string, recipient: string) => {
    setAmount(amount);
    setRecipient(recipient);
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to send tips
        </p>
      </div>
    );
  }

  if (!sessionManager.isSessionActive()) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Start a session to send tips
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Send Instant Tips
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Gas-free micro-transactions powered by Yellow SDK
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Quick Tips */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Quick Tips
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                onClick={() => setAmount(quickAmount)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  amount === quickAmount
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-yellow-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${quickAmount}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tip Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="0x..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount (USDC)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.01"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>
        </div>

        {/* Send Button */}
        <button
          onClick={sendTip}
          disabled={!recipient || !amount || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
          {isLoading ? 'Sending...' : 'Send Tip'}
        </button>

        {/* Session Info */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Session Active
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All tips are processed instantly off-chain and will be settled on-chain when the session ends.
          </p>
        </div>
      </div>
    </div>
  );
}
