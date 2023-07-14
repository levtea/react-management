import { request, frontRequest, ResponseType } from '@/request/request';

export const generateBankAccount = function async(params: any): Promise<ResponseType<any>> {
  return request<any>({
    url: '/bind',
    method: 'post',
    data: params,
  });
};

export const bindGenerateBankAccount = function async(params: any): Promise<ResponseType<any>> {
  return frontRequest<any>({
    url: '/platform/mock_bank',
    method: 'post',
    data: params,
  });
};
