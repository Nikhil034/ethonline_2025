# Yellow Instant Tip - ETH Online 2025

A Next.js application showcasing gas-free micro-transactions using Yellow SDK and Nitrolite protocol. Built for ETH Online 2025 hackathon.

## 🚀 Features

- **Gas-Free Transactions**: Send micro-tips without gas fees using off-chain state channels
- **Instant Settlement**: Off-chain transactions settle instantly without waiting for block confirmations
- **Session-Based Logic**: Define allowances for in-app use with automatic on-chain settlement
- **Modern UI**: Beautiful, responsive interface with dark mode support
- **Real-time Statistics**: Track tips, transactions, and session analytics
- **Multi-Chain Support**: Works with all EVM chains (Solana support coming soon)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom gradients and animations
- **Wallet Integration**: RainbowKit with Wagmi
- **State Management**: React hooks with custom session manager
- **Icons**: Lucide React
- **Charts**: Recharts (for future analytics)
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet
- WalletConnect Project ID (optional, for production)

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd yellow-instant-tip
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Yellow SDK Configuration (optional overrides)
NEXT_PUBLIC_YELLOW_RPC_URL=https://nitrolite-testnet.yellow.org
NEXT_PUBLIC_YELLOW_CHAIN_ID=42069
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
yellow-instant-tip/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx           # Main application page
│   │   ├── providers.tsx       # Wallet and query providers
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── WalletConnect.tsx   # Wallet connection component
│   │   ├── SessionManager.tsx  # Session management UI
│   │   ├── TippingInterface.tsx # Tip sending interface
│   │   └── TransactionHistory.tsx # Transaction history & stats
│   └── lib/
│       ├── yellowConfig.ts     # Yellow SDK configuration
│       ├── sessionManager.ts   # Session management logic
│       └── types.ts           # TypeScript type definitions
├── public/                     # Static assets
├── package.json
└── README.md
```

## 🔧 Configuration

### Yellow SDK Setup

The application is configured to work with the Nitrolite test environment:

```typescript
// lib/yellowConfig.ts
export const yellowConfig = {
  network: 'nitrolite-testnet',
  rpcUrl: 'https://nitrolite-testnet.yellow.org',
  chainId: 42069,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  maxOffChainBalance: '1000', // Maximum USDC for off-chain
  supportedTokens: {
    USDC: {
      address: '0xA0b86a33E6441b8C4C8C0E1234567890abcdef12',
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin'
    }
  }
};
```

### Supported Networks

- Ethereum Mainnet
- Polygon
- Arbitrum
- Optimism
- Base
- Sepolia Testnet
- **Nitrolite Testnet** (42069) - Primary network for testing

## 🎯 How It Works

### 1. Session Management
- Users start a session by connecting their wallet
- Sessions have configurable timeouts and balance limits
- All off-chain transactions happen within the session

### 2. Off-Chain Transactions
- Tips and micro-payments are processed instantly
- No gas fees required for individual transactions
- State is maintained off-chain using Yellow SDK

### 3. On-Chain Settlement
- When session ends, all transactions are settled on-chain
- Final balances are updated via smart contract calls
- Users can withdraw or continue with new sessions

### 4. Real-time Updates
- Transaction history updates in real-time
- Statistics are calculated and displayed live
- Session status is tracked continuously

## 🎨 UI Components

### WalletConnect
- RainbowKit integration for wallet connection
- Network switching support
- Balance display
- Connection status indicators

### SessionManager
- Start/end session controls
- Session duration tracking
- Off-chain balance monitoring
- Transaction count display

### TippingInterface
- Quick tip amounts (0.01, 0.05, 0.10, etc.)
- Recipient address input
- Optional message field
- Real-time validation

### TransactionHistory
- Tabbed interface (Transactions, Tips, Statistics)
- Real-time transaction updates
- Top recipients tracking
- Session analytics

## 🔒 Security Features

- **State Channel Security**: All off-chain transactions are secured by state channels
- **On-Chain Settlement**: Final settlement happens on-chain for security
- **Session Timeouts**: Automatic session expiration prevents abuse
- **Balance Limits**: Configurable maximum off-chain balances
- **Wallet Integration**: Secure wallet connection via RainbowKit

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## 🧪 Testing

### Test Scenarios

1. **Connect Wallet**: Test wallet connection with different providers
2. **Start Session**: Verify session creation and status tracking
3. **Send Tips**: Test micro-transactions with different amounts
4. **View History**: Check transaction history and statistics
5. **End Session**: Test session termination and on-chain settlement

### Test Networks

- **Nitrolite Testnet**: Primary testing network
- **Sepolia**: Ethereum testnet for additional testing
- **Local Development**: Use local blockchain for development

## 📊 Analytics & Monitoring

The application includes built-in analytics:

- **Session Metrics**: Duration, transaction count, total volume
- **Tip Statistics**: Average tip, top recipients, frequency
- **Real-time Updates**: Live transaction and balance updates
- **Performance Tracking**: Session performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Yellow SDK Team** for the amazing off-chain infrastructure
- **RainbowKit** for seamless wallet integration
- **Next.js Team** for the excellent framework
- **ETH Online 2025** for the hackathon opportunity

## 📞 Support

- **Documentation**: [Yellow SDK Docs](https://docs.yellow.org)
- **Community**: [Yellow Discord](https://discord.gg/yellow)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)

## 🔮 Future Enhancements

- [ ] Solana support
- [ ] Mobile app integration
- [ ] Advanced analytics dashboard
- [ ] Multi-token support
- [ ] Social features (tip leaderboards)
- [ ] API for third-party integrations
- [ ] Advanced session management
- [ ] Cross-app wallet functionality

---

**Built with ❤️ for ETH Online 2025**

*Powered by Yellow SDK and Nitrolite Protocol*
