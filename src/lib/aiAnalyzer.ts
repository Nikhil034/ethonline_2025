// lib/aiAnalyzer.ts - AI-Powered Content Analysis (MeTTa-style reasoning)

import { ContentAnalysis } from './types';

export class AIAnalyzer {
  
  // Analyze content quality using structured reasoning
  analyzeContent(content: string): ContentAnalysis {
    let score = 5.0; // Base score
    const reasons: string[] = [];

    // Factor 1: Content Length (0-2 points)
    const wordCount = content.split(' ').length;
    if (wordCount > 50) {
      score += 2;
      reasons.push('substantial length');
    } else if (wordCount > 20) {
      score += 1;
      reasons.push('moderate length');
    }

    // Factor 2: Engagement Indicators (0-1.5 points)
    const hasEmojis = /[\u{1F600}-\u{1F64F}]/u.test(content);
    const hasExclamation = content.includes('!');
    if (hasEmojis) {
      score += 0.8;
      reasons.push('engaging visuals');
    }
    if (hasExclamation) {
      score += 0.7;
      reasons.push('enthusiastic tone');
    }

    // Factor 3: Positive Sentiment (0-2 points)
    const positiveWords = ['amazing', 'great', 'excellent', 'awesome', 'love', 'beautiful', 'fantastic'];
    const positiveCount = positiveWords.filter(word => 
      content.toLowerCase().includes(word)
    ).length;
    if (positiveCount > 0) {
      score += Math.min(positiveCount * 0.5, 2);
      reasons.push('positive sentiment');
    }

    // Factor 4: Creativity Indicators (0-1 point)
    const creativeWords = ['innovative', 'creative', 'unique', 'original', 'interesting'];
    const hasCreativity = creativeWords.some(word => 
      content.toLowerCase().includes(word)
    );
    if (hasCreativity) {
      score += 1;
      reasons.push('creative expression');
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
