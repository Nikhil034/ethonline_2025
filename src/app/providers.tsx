'use client';

import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, arbitrum, optimism, base, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';

// Configure chains for RainbowKit
const config = getDefaultConfig({
  appName: 'Yellow Instant Tip',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'your-project-id',
  chains: [
    mainnet,
    polygon,
    arbitrum,
    optimism,
    base,
    sepolia,
    // Add Nitrolite testnet when available
    {
      id: 42069,
      name: 'Nitrolite Testnet',
      nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: ['https://nitrolite-testnet.yellow.org'] },
      },
      blockExplorers: {
        default: { name: 'Nitrolite Explorer', url: 'https://explorer.nitrolite.yellow.org' },
      },
      testnet: true,
    },
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [42069]: http('https://nitrolite-testnet.yellow.org'),
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          showRecentTransactions={true}
          appInfo={{
            appName: 'Yellow Instant Tip',
            disclaimer: ({ Text, Link }: { Text: any; Link: any }) => (
              <Text>
                By connecting your wallet, you agree to the{' '}
                <Link href="https://yellow.org/terms">Terms of Service</Link> and{' '}
                <Link href="https://yellow.org/privacy">Privacy Policy</Link>.
              </Text>
            ),
          }}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
