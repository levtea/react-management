import React, { useEffect } from 'react';
import { Table } from 'antd';
import { BankWithDraws, getBankWithDrawsList, BillWithDraws, getBillWithDraws } from '@/actions/withdraw';
import type { ColumnsType } from 'antd/es/table';
import '@/assets/styles/global.scss';

const View = () => {
  const [bankWithDrawsList, setBankWithDrawsList] = React.useState<BankWithDraws[]>();
  const [billWithDrawsList, setBillWithDraws] = React.useState<BillWithDraws[]>();

  const BankColumns: ColumnsType<BankWithDraws> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IdNo',
      dataIndex: 'idNo',
      key: 'idNo',
    },
  ];

  const BillColumns: ColumnsType<BillWithDraws> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'BillCode',
      dataIndex: 'billCode',
      key: 'billCode',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }) => <>{status == 0 ? '未兑换' : '已兑换'}</>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
  ];

  useEffect(() => {
    async function loadData() {
      const bankWithDrawsRes = await getBankWithDrawsList();
      if (bankWithDrawsRes.code !== -1) {
        setBankWithDrawsList(bankWithDrawsRes.data);
      }
      const billWithDrawsListRes = await getBillWithDraws();
      if (billWithDrawsListRes.code !== -1) {
        setBillWithDraws(billWithDrawsListRes.data);
      }
      // setBankWithDrawsList([
      //   { id: '1', account: 'qqq', balance: '10', email: 'www', name: 'eee', idNo: '111' },
      //   { id: '2', account: 'qqq2', balance: '102', email: 'www2', name: 'eee2', idNo: '1112' },
      // ]);
      // setBillWithDraws([
      //   { id: '3', billCode: 'aaa', status: 1, amount: '123' },
      //   { id: '4', billCode: '4aaa', status: 0, amount: '1234' },
      // ]);
    }
    loadData();
  }, []);

  return (
    <div className="content">
      <div>
        <p className="contentTitle">Withdraw Bank</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={bankWithDrawsList} columns={BankColumns} pagination={false} size="small" />
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '150px' }}>
        <p className="contentTitle">Withdraw Bill</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={billWithDrawsList} columns={BillColumns} pagination={false} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
