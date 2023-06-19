import { request, ResponseType } from '@/request/request';

export interface mintResponse {
  id: string;
  cardNo: string;
  amount: string;
  address: string;
}

export const mint = function async(params: any): Promise<ResponseType<mintResponse>> {
  return request<mintResponse>({
    url: '/transfer',
    method: 'post',
    data: params,
  });
};

export interface mintHistory {
  id: string;
  amount: string;
  cardNo: string;
}

export const getMintHistory = function async(): Promise<ResponseType<mintResponse[]>> {
  return request<mintResponse[]>({
    url: '/transfers',
    method: 'get',
  });
};

export interface automaticMintResponse {
  id: string;
  account: string;
  balance: string;
  address: string;
}

export const automaticMint = function async(params: any): Promise<ResponseType<automaticMintResponse>> {
  return request<automaticMintResponse>({
    url: '/transfer',
    method: 'post',
    data: params,
  });
};
