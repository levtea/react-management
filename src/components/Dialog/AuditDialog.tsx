import { Modal, Input, message } from 'antd';
import { withdraw } from '@/actions/audit';
import { useState } from 'react';
import { HandleAudit } from '@/actionsContract/audit';
import { useWallet } from '@/hooks/wallet/wallet';

export const AuditDialog = ({
  isOpen,
  withdrawOrder,
  onClose,
  isPass,
}: {
  isOpen: boolean;
  withdrawOrder?: withdraw;
  onClose: () => void;
  isPass: boolean;
}) => {
  const [reason, setReason] = useState('');
  const walletData = useWallet();
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Success',
    });
  };
  const error = (res: string) => {
    messageApi.open({
      type: 'error',
      content: res,
    });
  };

  const handleAudit = async () => {
    console.log('reason', reason);
    if (withdrawOrder) {
      const res = await HandleAudit(walletData.provider, withdrawOrder, isPass);
      if (res) {
        error(res);
      } else {
        success();
      }
    }
    onClose();
  };
  return (
    <>
      {contextHolder}
      <Modal title={'Refuse'} open={isOpen} onOk={() => handleAudit()} onCancel={() => onClose()}>
        <Input
          width={'100%'}
          placeholder={isPass ? 'notes(optional)' : 'refuse reason'}
          onChange={(e) => {
            if (e != null) {
              setReason(e.target.value);
            }
          }}
        />
      </Modal>
    </>
  );
};
