import { YellowSDK } from '@yellow-org/sdk';

// Yellow SDK Configuration for Nitrolite Test Environment
export const yellowConfig = {
  // Nitrolite test environment configuration
  network: 'nitrolite-testnet',
  rpcUrl: 'https://nitrolite-testnet.yellow.org',
  chainId: 42069, // Nitrolite testnet chain ID
  
  // Session configuration
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  maxOffChainBalance: '1000', // Maximum USDC for off-chain transactions
  
  // Supported tokens
  supportedTokens: {
    USDC: {
      address: '0xA0b86a33E6441b8C4C8C0E1234567890abcdef12', // Mock USDC on Nitrolite
      decimals: 6,
      symbol: 'USDC',
      name: 'USD Coin'
    },
    ETH: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      symbol: 'ETH',
      name: 'Ethereum'
    }
  }
};

// Initialize Yellow SDK instance
export const initializeYellowSDK = async () => {
  try {
    const sdk = new YellowSDK({
      network: yellowConfig.network,
      rpcUrl: yellowConfig.rpcUrl,
      chainId: yellowConfig.chainId,
    });
    
    await sdk.initialize();
    return sdk;
  } catch (error) {
    console.error('Failed to initialize Yellow SDK:', error);
    throw error;
  }
};

// Session management utilities
export const createSession = async (sdk: YellowSDK, userAddress: string) => {
  try {
    const session = await sdk.createSession({
      userAddress,
      timeout: yellowConfig.sessionTimeout,
      maxBalance: yellowConfig.maxOffChainBalance,
    });
    
    return session;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
};

// Off-chain transaction utilities
export const sendOffChainTransaction = async (
  sdk: YellowSDK,
  sessionId: string,
  to: string,
  amount: string,
  token: string = 'USDC'
) => {
  try {
    const tx = await sdk.sendOffChain({
      sessionId,
      to,
      amount,
      token,
    });
    
    return tx;
  } catch (error) {
    console.error('Failed to send off-chain transaction:', error);
    throw error;
  }
};

// On-chain settlement
export const settleOnChain = async (
  sdk: YellowSDK,
  sessionId: string
) => {
  try {
    const settlement = await sdk.settleSession({
      sessionId,
    });
    
    return settlement;
  } catch (error) {
    console.error('Failed to settle on-chain:', error);
    throw error;
  }
};
