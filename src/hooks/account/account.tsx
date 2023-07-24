import { useWallet } from '@/hooks/wallet/wallet';

export const useAccount = () => {
  const walletData = useWallet();

  const address = walletData.address;
  const isConnected = !!address;

  return {
    loading: walletData.loading,
    isConnected,
    address: walletData.address,
    handleConnect: walletData.handleConnectWallet,
  };
};
