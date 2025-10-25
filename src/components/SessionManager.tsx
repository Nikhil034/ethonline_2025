'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { SessionManager } from '../lib/sessionManager';
// Remove direct import of Session type if it's not exported from ../lib/types
// Instead, use 'any' type or define your own type if necessary
import { Session } from '../lib/types'; // <-- Removed due to missing export
import { Play, Pause, Square, Clock, DollarSign, TrendingUp } from 'lucide-react';

interface SessionManagerProps {
  onSessionChange: (session: any | null) => void;
  onStatsUpdate: (stats: any) => void;
}

export default function SessionManagerComponent({ onSessionChange, onStatsUpdate }: SessionManagerProps) {
  const { address, isConnected } = useAccount();
  const [sessionManager] = useState(() => new SessionManager());
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Start new session
  const startSession = async () => {
    if (!address || !isConnected) return;
    
    setIsLoading(true);
    try {
      const session = sessionManager.createSession(address);
      setCurrentSession(session);
      onSessionChange(session);
      
      // Update stats
      const stats = sessionManager.getSessionStats();
      onStatsUpdate(stats);
    } catch (error) {
      console.error('Failed to start session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // End current session
  const endSession = async () => {
    if (!currentSession) return;
    
    setIsLoading(true);
    try {
      const endedSession = sessionManager.endSession();
      setCurrentSession(null);
      onSessionChange(null);
      
      // Update stats
      const stats = sessionManager.getSessionStats();
      onStatsUpdate(stats);
    } catch (error) {
      console.error('Failed to end session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get session duration
  const getSessionDuration = () => {
    if (!currentSession) return 0;
    const now = Date.now();
    const startTime = currentSession.startTime;
    return Math.floor((now - startTime) / (1000 * 60)); // minutes
  };

  // Get session stats
  const getSessionStats = () => {
    return sessionManager.getSessionStats();
  };

  useEffect(() => {
    // Update stats periodically
    const interval = setInterval(() => {
      if (currentSession) {
        const stats = sessionManager.getSessionStats();
        onStatsUpdate(stats);
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [currentSession, sessionManager, onStatsUpdate]);

  if (!isConnected) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet to start a session
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Session Manager
        </h2>
        <div className="flex items-center gap-2">
          {currentSession ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Active
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              Inactive
            </div>
          )}
        </div>
      </div>

      {currentSession ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Duration
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                {getSessionDuration()}m
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">
                  Off-Chain Balance
                </span>
              </div>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                ${currentSession.offChainBalance}
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  Transactions
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {currentSession.totalTransactions}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={endSession}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Square className="w-5 h-5" />
              {isLoading ? 'Ending...' : 'End Session'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Play className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Start a New Session
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Begin off-chain transactions with instant settlement
          </p>
          <button
            onClick={startSession}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
          >
            <Play className="w-5 h-5" />
            {isLoading ? 'Starting...' : 'Start Session'}
          </button>
        </div>
      )}
    </div>
  );
}
