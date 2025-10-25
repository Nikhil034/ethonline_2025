'use client';

import React, { useState } from 'react';
import { Heart, MessageCircle, Share, Zap, Star, Clock, User } from 'lucide-react';
import { Content, Creator } from '@/lib/creatorData';
import { hybridNitroliteSDK } from '@/lib/hybridNitroliteConfig';
import { useAccount } from 'wagmi';

interface ContentFeedProps {
  content: Content[];
  creators: Creator[];
  onTip: (contentId: string, amount: number) => void;
}

export function ContentFeed({ content, creators, onTip }: ContentFeedProps) {
  const { address } = useAccount();
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const [tipAmount, setTipAmount] = useState(0.01);

  const getCreator = (creatorId: string): Creator | undefined => {
    return creators.find(creator => creator.id === creatorId);
  };

  const handleTip = async (content: Content) => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      // Use the onTip callback to handle the tip
      await onTip(content.id, tipAmount);
      setSelectedContent(null);
    } catch (error) {
      console.error('Failed to send tip:', error);
      alert('Failed to send tip. Please try again.');
    }
  };

  const formatTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getScoreColor = (score: number): string => {
    if (score >= 9) return 'text-green-600 bg-green-100';
    if (score >= 8) return 'text-blue-600 bg-blue-100';
    if (score >= 7) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {content.map((item) => {
        const creator = getCreator(item.creatorId);
        if (!creator) return null;

        return (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                  {creator.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{creator.name}</h3>
                    {creator.verified && (
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    <span className="text-gray-500 text-sm">{creator.handle}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-600">{formatTimeAgo(item.timestamp)}</span>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getScoreColor(item.aiScore)}`}>
                      AI Score: {item.aiScore}/10
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Media */}
              {item.mediaUrl && (
                <div className="mb-4">
                  <img 
                    src={item.mediaUrl} 
                    alt={item.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>{item.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                    <Share className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total Tips</div>
                    <div className="font-bold text-green-600">${item.tips.toFixed(2)}</div>
                  </div>
                  <button
                    onClick={() => setSelectedContent(item)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all font-semibold"
                  >
                    <Zap className="w-4 h-4" />
                    Tip Creator
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Tip Modal */}
      {selectedContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center text-xl">
                {getCreator(selectedContent.creatorId)?.avatar}
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Tip Creator</h3>
                <p className="text-sm text-gray-600">{getCreator(selectedContent.creatorId)?.name}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tip Amount (USDC)
              </label>
              <div className="flex gap-2">
                {[0.01, 0.05, 0.1, 0.5, 1.0].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTipAmount(amount)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      tipAmount === amount
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(parseFloat(e.target.value) || 0)}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Custom amount"
                min="0.01"
                step="0.01"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedContent(null)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleTip(selectedContent)}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all font-semibold"
              >
                Send ${tipAmount} Tip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
