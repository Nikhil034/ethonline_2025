import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { aiAnalyzer } from '@/lib/aiAnalyzer';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { message, address, history } = await request.json();

        // Check if message contains content to analyze
        const analyzeMatch = message.match(/analyze[:\s]+(.+)/i) ||
            message.match(/tip.*for[:\s]+(.+)/i) ||
            message.match(/how much.*[:\s]+(.+)/i);

        let metadata = {};
        let enhancedMessage = message;

        if (analyzeMatch) {
            // Extract content to analyze
            const contentToAnalyze = analyzeMatch[1];

            // Use AI Analyzer (MeTTa-style reasoning)
            const analysis = aiAnalyzer.analyzeContent(contentToAnalyze);

            metadata = {
                qualityScore: analysis.score,
                suggestedTip: analysis.suggestedTip,
                reasoning: analysis.reasoning
            };

            // Enhance message with analysis for GPT
            enhancedMessage = `${message}\n\n[ANALYSIS RESULTS]\n${analysis.reasoning}\nSuggested Tip: $${analysis.suggestedTip}`;
        }

        // System prompt
        const systemPrompt = `You are an AI assistant for InstaTip AI, combining Yellow Network's instant payments with intelligent tipping suggestions.

Your role:
- Help users analyze content quality
- Suggest appropriate tip amounts (0.01 - 1.00 USDC)
- Explain reasoning clearly
- Be friendly and helpful

User's wallet: ${address || 'Not connected'}

Guidelines:
- Always explain your reasoning
- Be concise but friendly
- When analyzing content, reference the quality scores provided
- Suggest actionable next steps`;

        // Call OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [
                { role: 'system', content: systemPrompt },
                ...history.slice(-5).map((h: any) => ({
                    role: h.role,
                    content: h.content
                })),
                { role: 'user', content: enhancedMessage }
            ],
            temperature: 0.7,
            max_tokens: 400
        });

        return NextResponse.json({
            response: completion.choices[0].message.content,
            metadata
        });

    } catch (error: any) {
        console.error('AI API error:', error);

        // Fallback response if OpenAI fails
        return NextResponse.json({
            response: "I'm here to help! Try asking me to analyze content like: 'Analyze: This is a great post about AI!'",
            metadata: {}
        });
    }
}
