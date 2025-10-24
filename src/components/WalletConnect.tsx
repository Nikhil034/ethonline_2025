// 'use client';

// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount, useBalance } from 'wagmi';
// import { formatEther } from 'viem';
// import { Wallet, User, Coins } from 'lucide-react';

// export default function WalletConnect() {
//   const { address, isConnected } = useAccount();
//   const { data: balance } = useBalance({
//     address: address,
//   });

//   return (
//     <div className="flex items-center gap-4">
//       {isConnected && balance && (
//         <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
//           <Coins className="w-4 h-4 text-yellow-500" />
//           <span className="text-sm font-medium">
//             {parseFloat(formatEther(balance.value)).toFixed(4)} ETH
//           </span>
//         </div>
//       )}
      
//       <ConnectButton.Custom>
//         {({
//           account,
//           chain,
//           openAccountModal,
//           openChainModal,
//           openConnectModal,
//           authenticationStatus,
//           mounted,
//         }) => {
//           const ready = mounted && authenticationStatus !== 'loading';
//           const connected =
//             ready &&
//             account &&
//             chain &&
//             (!authenticationStatus ||
//               authenticationStatus === 'authenticated');

//           return (
//             <div
//               {...(!ready && {
//                 'aria-hidden': true,
//                 style: {
//                   opacity: 0,
//                   pointerEvents: 'none',
//                   userSelect: 'none',
//                 },
//               })}
//             >
//               {(() => {
//                 if (!connected) {
//                   return (
//                     <button
//                       onClick={openConnectModal}
//                       type="button"
//                       className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 shadow-lg hover:shadow-xl"
//                     >
//                       <Wallet className="w-5 h-5" />
//                       Connect Wallet
//                     </button>
//                   );
//                 }

//                 if (chain.unsupported) {
//                   return (
//                     <button
//                       onClick={openChainModal}
//                       type="button"
//                       className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-200"
//                     >
//                       Wrong Network
//                     </button>
//                   );
//                 }

//                 return (
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={openChainModal}
//                       type="button"
//                       className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
//                     >
//                       {chain.hasIcon && (
//                         <div
//                           style={{
//                             background: chain.iconBackground,
//                             width: 20,
//                             height: 20,
//                             borderRadius: 999,
//                             overflow: 'hidden',
//                             marginRight: 4,
//                           }}
//                         >
//                           {chain.iconUrl && (
//                             <img
//                               alt={chain.name ?? 'Chain icon'}
//                               src={chain.iconUrl}
//                               style={{ width: 20, height: 20 }}
//                             />
//                           )}
//                         </div>
//                       )}
//                       {chain.name}
//                     </button>

//                     <button
//                       onClick={openAccountModal}
//                       type="button"
//                       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200"
//                     >
//                       <User className="w-4 h-4" />
//                       {account.displayName}
//                       {account.displayBalance
//                         ? ` (${account.displayBalance})`
//                         : ''}
//                     </button>
//                   </div>
//                 );
//               })()}
//             </div>
//           );
//         }}
//       </ConnectButton.Custom>
//     </div>
//   );
// }


'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

export function WalletConnect() {
  return <ConnectButton />;
}
