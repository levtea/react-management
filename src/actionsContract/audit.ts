import { BrowserProvider } from 'ethers';
import { ethers } from 'ethers';
import { withdraw } from '@/actions/audit';
import reviewABI from '@/actionsContract/abi/review.json';

export const HandleAudit = async (provider: BrowserProvider, order: withdraw, status: boolean): Promise<string> => {
  const contract = new ethers.Contract(import.meta.env.VITE_WITHDRAW_ADDRESS_CONTRACT, reviewABI, provider);
  try {
    console.log('request', '0x' + order.withdraw_id, status);
    const tx = await contract.audit.staticCallResult('0x' + order.withdraw_id, status);
    const receipt = await tx.wait();
    console.log('receipt', receipt);
    return '';
  } catch (err: any) {
    console.log('err', err.reason);
    return err.reason;
  }
};
