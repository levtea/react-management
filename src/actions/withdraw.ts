import { request, ResponseType } from '@/request/request';

export interface BankWithDraws {
  id: string;
  name: string;
  account: string;
  balance: number;
  email: string;
  createdAt: string;
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

export interface ReserveAccountOrder {
  id: string;
  amount: number;
  userAccount: string;
  createdAt: string;
}

export const getReserveAccountOrder = function async(): Promise<ResponseType<ReserveAccountOrder[]>> {
  return request<ReserveAccountOrder[]>({
    url: '/records',
    method: 'get',
  });
};
