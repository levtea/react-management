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
  const [confirmLoading, setConfirmLoading] = useState(false);

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
    setConfirmLoading(true);
    if (withdrawOrder) {
      const res = await HandleAudit(walletData.provider, withdrawOrder, isPass);
      if (res) {
        setConfirmLoading(false);
        error(res);
      } else {
        setConfirmLoading(false);
        success();
      }
    }
    onClose();
  };
  return (
    <>
      {contextHolder}
      <Modal
        title={'Refuse'}
        open={isOpen}
        confirmLoading={confirmLoading}
        onOk={() => handleAudit()}
        onCancel={() => onClose()}>
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
