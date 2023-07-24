import { BrowserProvider } from 'ethers';
import { ethers } from 'ethers';
import { withdraw } from '@/actions/audit';
import reviewABI from '@/actionsContract/abi/review.json';

export const HandleAudit = async (provider: BrowserProvider, order: withdraw, status: boolean) => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(import.meta.env.VITE_WITHDRAW_ADDRESS_CONTRACT, reviewABI, signer);
  try {
    console.log('request', '0x' + order.withdraw_id, status);
    const tx = await contract.audit('0x' + order.withdraw_id, status);
    const receipt = await tx.wait();
    console.log('receipt', receipt);
    return '';
  } catch (err: any) {
    console.log('err', err);
    return err.reason;
  }
};

export const GetAuditNum = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(import.meta.env.VITE_WITHDRAW_ADDRESS_CONTRACT, reviewABI, signer);
  try {
    const res = await contract.getThreshold();
    return res;
  } catch (err: any) {
    console.log('err', err);
    return 0;
  }
};
