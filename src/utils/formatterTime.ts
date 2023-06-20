import moment from 'moment';

export const formatterTime = (val: string) => {
  return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '';
};
