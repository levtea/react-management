import BigNumber from 'bignumber.js';
import { useCallback, useEffect, useState } from 'react';
import { BrowserProvider } from 'ethers';
import { useLocation } from 'react-router-dom';

let provider: BrowserProvider;
let topBalance: BigNumber;
let topAddress: string;
let topChainId: number;

export interface IEtherReact {
  address: string;
  account: string;
  loading: boolean;
  provider: BrowserProvider;
  chainId: number;
  balance: BigNumber;
  handleConnectWallet: () => Promise<void>;
}

export const useWallet = (): IEtherReact => {
  const location = useLocation();

  const [address, setAddress] = useState<string>(topAddress);
  const [chainId, setChainId] = useState<number>(topChainId);
  const [balance, setBalance] = useState<BigNumber>(topBalance);
  const [loading, setLoading] = useState(true);

  const init = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('please install metamask first!');
      return;
    }
    const _provider = new BrowserProvider(window.ethereum);
    // console.log('_provider', _provider);
    provider = _provider;
    const _accounts = await _provider.send('eth_requestAccounts', []);
    if (_accounts && _accounts.length > 0) {
      topAddress = _accounts[0];
      setAddress(_accounts[0]);
      const _balance = await provider.getBalance(_accounts[0]);
      topBalance = new BigNumber(_balance.toString());
      setBalance(new BigNumber(_balance.toString()));
    }
    const { chainId } = await provider.getNetwork();
    topChainId = Number(chainId);
  }, []);

  useEffect(() => {
    window.ethereum.on('accountsChanged', (accounts) => {
      setAddress(accounts[0]);
    });
    window.ethereum.on('chainChanged', (networkIDstring) => {
      setChainId(networkIDstring);
    });
  }, [location, init]);

  useEffect(() => {
    if (chainId && balance) {
      setLoading(false);
    }
  }, [chainId, balance, loading]);

  useEffect(() => {
    setLoading(false);
  }, [init]);

  return {
    address,
    account: address,
    loading,
    provider,
    chainId,
    balance,
    handleConnectWallet: init,
  };
};
