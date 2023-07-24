import { useCallback, useEffect } from 'react';
import { GetErc20List } from '@/actions/chainInfo';
import { setErc20Info, getErc20Info } from '@/utils/localStorage';

export const ChainInfo = ({ children }) => {
  const init = useCallback(async () => {
    const erc20Res = await GetErc20List();
    console.log('get erc20', erc20Res);
    if (erc20Res.code === 200) {
      setErc20Info(JSON.stringify(erc20Res.data));
    }
  }, []);

  useEffect(() => {
    if (!getErc20Info()) {
      init();
    }
  }, [init]);

  return <>{children}</>;
};
