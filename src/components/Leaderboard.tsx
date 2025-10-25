'use client';

import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, Users, Zap, Crown, Medal, Award } from 'lucide-react';
import { Creator } from '@/lib/creatorData';

interface LeaderboardProps {
  creators: Creator[];
  sortBy: 'tips' | 'rating' | 'followers';
  onSortChange: (sortBy: 'tips' | 'rating' | 'followers') => void;
}

export function Leaderboard({ creators, sortBy, onSortChange }: LeaderboardProps) {
  const [timeframe, setTimeframe] = useState<'all' | 'week' | 'month'>('all');

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
          {index + 1}
        </span>;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200';
      case 1:
        return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
      case 2:
        return 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getSortedCreators = () => {
    return [...creators].sort((a, b) => {
      switch (sortBy) {
        case 'tips':
          return b.totalTips - a.totalTips;
        case 'rating':
          return b.rating - a.rating;
        case 'followers':
          return b.followers - a.followers;
        default:
          return 0;
      }
    });
  };

  const sortedCreators = getSortedCreators();

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
            <Trophy className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Creator Leaderboard</h2>
            <p className="text-gray-600">Top creators by community support</p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'tips', label: 'Total Tips', icon: Zap },
            { key: 'rating', label: 'AI Rating', icon: Star },
            { key: 'followers', label: 'Followers', icon: Users }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onSortChange(key as 'tips' | 'rating' | 'followers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                sortBy === key
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Timeframe Filter */}
        <div className="flex gap-2">
          {[
            { key: 'all', label: 'All Time' },
            { key: 'week', label: 'This Week' },
            { key: 'month', label: 'This Month' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeframe(key as 'all' | 'week' | 'month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                timeframe === key
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="divide-y divide-gray-100">
        {sortedCreators.map((creator, index) => (
          <div
            key={creator.id}
            className={`p-6 ${getRankColor(index)} border-l-4 ${
              index === 0 ? 'border-yellow-400' : 
              index === 1 ? 'border-gray-400' : 
              index === 2 ? 'border-orange-400' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank */}
              <div className="flex-shrink-0">
                {getRankIcon(index)}
              </div>

              {/* Creator Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-2xl">
                    {creator.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{creator.name}</h3>
                      {creator.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">{creator.handle}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3">{creator.bio}</p>

                {/* Stats */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">
                      ${creator.totalTips.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-500">tips</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold text-yellow-600">
                      {creator.rating}/10
                    </span>
                    <span className="text-xs text-gray-500">rating</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-600">
                      {formatNumber(creator.followers)}
                    </span>
                    <span className="text-xs text-gray-500">followers</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    <span className="text-sm font-semibold text-purple-600">
                      {creator.contentCount}
                    </span>
                    <span className="text-xs text-gray-500">posts</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {creator.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-all font-semibold text-sm">
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 border-t border-gray-100">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Rankings are updated in real-time based on community support and AI analysis
          </p>
        </div>
      </div>
    </div>
  );
}

