import { request, ResponseType } from '@/request/request';

export const generateBankAccount = function async(params: any): Promise<ResponseType<string>> {
  return request<string>({
    url: '/bind',
    method: 'post',
    data: params,
  });
};
