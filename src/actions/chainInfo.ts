import { frontRequest, ResponseType } from '@/request/request';
import { getErc20Info } from '@/utils/localStorage';

export interface erc20ContractInfo {
  name: string;
  address: string;
  decimals: number;
  permitName: string;
  permitVersion: string;
  supportEIP2612: boolean;
}

export const GetErc20List = async (): Promise<ResponseType<erc20ContractInfo[]>> => {
  return frontRequest<erc20ContractInfo[]>({
    url: '/platform/v1/erc20',
    method: 'get',
  });
};

export const GetTokenErcName = (token: string): string => {
  const erc20List = JSON.parse(getErc20Info() || '');
  let names = erc20List[0].name.replace(/[a-z]/g, '').replace('-', '');
  erc20List &&
    erc20List.length > 0 &&
    erc20List.map((item: erc20ContractInfo) => {
      if (item.address.toLowerCase() === token.toLowerCase()) {
        // console.log('names item', item);
        names = item.name;
      }
      return '';
    });
  return names;
};
