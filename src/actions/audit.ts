import { frontRequest, ResponseType } from '@/request/request';

export interface withdraw {
  withdraw_id: string;
  token_amount: number;
  token_address: string;
  status: number;
  reject_count: number;
  pass_count: number;
  hash: string;
  create_time: number;
}

export const getWithdrawList = function async(): Promise<ResponseType<withdraw[]>> {
  return frontRequest<withdraw[]>({
    url: '/platform/v1/audit/withdraws',
    method: 'get',
  });
};
