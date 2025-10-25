// lib/config.ts - Configuration for Nitrolite Integration

export const NITROLITE_CONFIG = {
  // ClearNode WebSocket URL
  clearNodeUrl: process.env.NEXT_PUBLIC_CLEARNODE_URL || 'wss://clearnet.yellow.com/ws',
  
  // Channel ID (get this from apps.yellow.com)
  channelId: process.env.NEXT_PUBLIC_CHANNEL_ID || 'demo-channel-123',
  
  // Authentication token (if required)
  authToken: process.env.NEXT_PUBLIC_AUTH_TOKEN || undefined,
  
  // Application configuration
  applicationId: 'instatip-ai',
  
  // Session configuration
  defaultAllowance: 50, // USDC
  maxAllowance: 100, // USDC
  
  // Network configuration
  network: {
    name: 'Yellow Network',
    chainId: 1, // Mainnet (adjust for testnet)
    rpcUrl: 'https://eth.llamarpc.com'
  }
};

export const APP_CONFIG = {
  name: 'InstaTip AI',
  description: 'AI-powered instant tipping with zero gas fees',
  version: '1.0.0',
  features: {
    aiAnalysis: true,
    instantTipping: true,
    offChainSettlement: true,
    realTimeUpdates: true
  }
};

