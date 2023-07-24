import { useAccount } from '@/hooks/account/account';
import { useEffect } from 'react';

const MainHeader: React.FC = () => {
  const { address, isConnected, handleConnect } = useAccount();
  useEffect(() => {
    if (!isConnected) {
      handleConnect();
    }
  });

  return <div style={{ marginLeft: '25px' }}>{address}</div>;
};

export default MainHeader;
