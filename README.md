# InstaTip AI - Creator Economy Platform

AI-powered creator tipping platform with instant, gas-free payments using Yellow Network's ERC-7824 Nitrolite SDK.

## 🚀 Features

- **Instant Tipping**: Zero gas fees with off-chain transactions via Nitrolite SDK
- **AI Content Analysis**: 7-factor quality scoring system for fair tip suggestions
- **Creator Leaderboards**: Real-time rankings by tips, AI ratings, and followers
- **Content Feed**: Twitter-like interface for browsing and tipping creator content
- **Session Management**: Off-chain spending allowances with on-chain settlement
- **Hybrid Development Mode**: Full functionality without USDC funding for development

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Blockchain**: Yellow Network ERC-7824 Nitrolite SDK, Viem, Wagmi
- **AI**: OpenAI GPT-4, Custom content analysis algorithms
- **Wallet**: RainbowKit, WalletConnect
- **State Management**: React hooks, custom session management

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create `.env.local`:
```env
# OpenAI API Key (for AI features)
OPENAI_API_KEY=your_openai_api_key

# WalletConnect Project ID
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Yellow Network Configuration
NEXT_PUBLIC_CHANNEL_ID=demo-channel-123
NEXT_PUBLIC_CLEARNODE_URL=wss://clearnet.yellow.com/ws
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main application
│   ├── layout.tsx            # Root layout
│   └── api/ai-assistant/     # AI API routes
├── components/
│   ├── ContentFeed.tsx       # Creator content display
│   ├── Leaderboard.tsx       # Creator rankings
│   ├── AIAssistant.tsx       # AI chat interface
│   └── WalletConnect.tsx     # Wallet connection
├── lib/
│   ├── hybridNitroliteConfig.ts  # Yellow Network SDK
│   ├── creatorData.ts         # Mock creator data
│   ├── aiAnalyzer.ts         # AI content analysis
│   └── types.ts              # TypeScript definitions
```


## 🎯 How It Works

### 1. Content Analysis
- AI analyzes creator content on 7 quality factors
- Generates quality scores (1-10) and tip suggestions
- Educational, technical, and engagement value assessment

### 2. Instant Tipping
- Tip creators directly on their content
- Zero gas fees with off-chain transactions
- Real-time transaction history and statistics

### 3. Creator Leaderboards
- Rank creators by total tips, AI ratings, followers
- Real-time updates and multiple sorting options
- Community-driven creator discovery

### 4. Session Management
- Off-chain spending allowances with on-chain settlement
- Batch multiple tips, settle once on-chain
- Development mode for testing without USDC

## 🎨 Key Components

- **ContentFeed**: Twitter-like creator content display with instant tipping
- **Leaderboard**: Creator rankings by tips, AI ratings, and followers  
- **AIAssistant**: Chat interface for content analysis and tip suggestions
- **SessionManager**: Off-chain transaction management with on-chain settlement

## 🔒 Security & Features

- **State Channel Security**: All off-chain transactions secured by Yellow Network
- **AI Content Analysis**: 7-factor quality scoring system
- **Hybrid Development**: Full functionality without USDC funding
- **Real-time Updates**: Live transaction history and creator rankings

## 🚀 Deployment

```bash
npm run build
npm start
```

## 📞 Support

- **Yellow Network**: [erc7824.org](https://erc7824.org)
- **Channel Setup**: [apps.yellow.com](https://apps.yellow.com)
- **Documentation**: [Yellow SDK Docs](https://docs.yellow.org)

---

**Built with ❤️ for ETH Online 2025**

*AI-powered creator economy powered by Yellow Network ERC-7824*
