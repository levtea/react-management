import { request, ResponseType } from '@/request/request';

export interface BankWithDraws {
  id: string;
  account: string;
  balance: string;
  email: string;
  name: string;
  idNo: string;
}

export const getBankWithDrawsList = function async(): Promise<ResponseType<BankWithDraws[]>> {
  return request<BankWithDraws[]>({
    url: '/withdraw',
    method: 'get',
  });
};

export interface BillWithDraws {
  id: string;
  billCode: string;
  status: number;
  amount: string;
}

export const getBillWithDraws = function async(): Promise<ResponseType<BillWithDraws[]>> {
  return request<BillWithDraws[]>({
    url: '/bills',
    method: 'get',
  });
};
