import { request, ResponseType } from '@/request/request';

export const generateBankAccount = function async(params: any): Promise<ResponseType<any>> {
  return request<any>({
    url: '/bind',
    method: 'post',
    data: params,
  });
};
