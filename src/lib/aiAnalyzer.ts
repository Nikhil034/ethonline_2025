// lib/aiAnalyzer.ts - AI-Powered Content Analysis (MeTTa-style reasoning)

import { ContentAnalysis } from './types';

export class AIAnalyzer {
  
  // Analyze content quality using structured reasoning
  analyzeContent(content: string): ContentAnalysis {
    let score = 5.0; // Base score
    const reasons: string[] = [];

    // Factor 1: Content Length (0-2 points)
    const wordCount = content.split(' ').length;
    if (wordCount > 100) {
      score += 2;
      reasons.push('comprehensive content');
    } else if (wordCount > 50) {
      score += 1.5;
      reasons.push('substantial length');
    } else if (wordCount > 20) {
      score += 1;
      reasons.push('moderate length');
    }

    // Factor 2: Engagement Indicators (0-2 points)
    const hasEmojis = /[\u{1F600}-\u{1F64F}]/u.test(content);
    const hasExclamation = content.includes('!');
    const hasQuestion = content.includes('?');
    const hasHashtags = content.includes('#');
    
    if (hasEmojis) {
      score += 0.8;
      reasons.push('engaging visuals');
    }
    if (hasExclamation) {
      score += 0.6;
      reasons.push('enthusiastic tone');
    }
    if (hasQuestion) {
      score += 0.4;
      reasons.push('interactive content');
    }
    if (hasHashtags) {
      score += 0.2;
      reasons.push('social media optimized');
    }

    // Factor 3: Educational Value (0-2 points)
    const educationalWords = ['explain', 'tutorial', 'guide', 'learn', 'understand', 'how to', 'step by step'];
    const educationalCount = educationalWords.filter(word => 
      content.toLowerCase().includes(word)
    ).length;
    if (educationalCount > 0) {
      score += Math.min(educationalCount * 0.4, 2);
      reasons.push('educational value');
    }

    // Factor 4: Technical Content (0-1.5 points)
    const technicalWords = ['blockchain', 'crypto', 'defi', 'nft', 'smart contract', 'web3', 'ethereum'];
    const technicalCount = technicalWords.filter(word => 
      content.toLowerCase().includes(word)
    ).length;
    if (technicalCount > 0) {
      score += Math.min(technicalCount * 0.3, 1.5);
      reasons.push('technical expertise');
    }

    // Factor 5: Positive Sentiment (0-1.5 points)
    const positiveWords = ['amazing', 'great', 'excellent', 'awesome', 'love', 'beautiful', 'fantastic', 'incredible'];
    const positiveCount = positiveWords.filter(word => 
      content.toLowerCase().includes(word)
    ).length;
    if (positiveCount > 0) {
      score += Math.min(positiveCount * 0.3, 1.5);
      reasons.push('positive sentiment');
    }

    // Factor 6: Creativity Indicators (0-1 point)
    const creativeWords = ['innovative', 'creative', 'unique', 'original', 'interesting', 'inspiring'];
    const hasCreativity = creativeWords.some(word => 
      content.toLowerCase().includes(word)
    );
    if (hasCreativity) {
      score += 1;
      reasons.push('creative expression');
    }

    // Factor 7: Community Building (0-1 point)
    const communityWords = ['community', 'together', 'share', 'collaborate', 'support', 'help'];
    const communityCount = communityWords.filter(word => 
      content.toLowerCase().includes(word)
    ).length;
    if (communityCount > 0) {
      score += Math.min(communityCount * 0.2, 1);
      reasons.push('community building');
    }

    // Cap score at 10
    score = Math.min(Math.max(score, 1), 10);

    // Calculate suggested tip based on quality
    const suggestedTip = this.calculateTipAmount(score);

    const reasoning = `Quality Score: ${score.toFixed(1)}/10. Factors: ${reasons.join(', ')}.`;

    return {
      score: parseFloat(score.toFixed(1)),
      reasoning,
      suggestedTip
    };
  }

  // Calculate tip amount based on quality score
  private calculateTipAmount(score: number): number {
    const baseAmount = 0.01;
    const multiplier = score / 5; // 0.2x to 2x
    return parseFloat((baseAmount * multiplier).toFixed(2));
  }

  // Detect suspicious patterns (fraud prevention)
  detectFraud(pattern: {
    frequency: number;
    amount: number;
    sameRecipient: boolean;
  }): boolean {
    // Simple fraud detection rules
    if (pattern.frequency > 100) return true; // Too many tips
    if (pattern.amount > 10) return true; // Unusually large tip
    if (pattern.sameRecipient && pattern.frequency > 50) return true; // Suspicious pattern
    
    return false;
  }
}

export const aiAnalyzer = new AIAnalyzer();
