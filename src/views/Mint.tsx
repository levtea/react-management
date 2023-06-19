import React, { useEffect } from 'react';
import { Input, Col, Row, Button, Table } from 'antd';
import { mint, mintHistory, getMintHistory } from '@/actions/mint';
import type { ColumnsType } from 'antd/es/table';
import '@/assets/styles/global.scss';

const View = () => {
  const [bankNo, setBankNo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [mintRes, setMintRes] = React.useState('');
  const [mintList, setMintList] = React.useState<mintHistory[]>();
  const [mintLoad, setMintLoad] = React.useState<boolean>(false);

  const columns: ColumnsType<mintHistory> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Card Number',
      dataIndex: 'cardNo',
      key: 'cardNo',
    },
  ];

  useEffect(() => {
    async function loadData() {
      const mintListRes = await getMintHistory();
      console.log('mintListRes', mintListRes);
      if (mintListRes.code !== -1) {
        setMintList(mintListRes.data);
      }
      // setMintList([
      //   { id: '1', amount: '10', cardNo: 'aabbcc' },
      //   { id: '2', amount: '12', cardNo: '2aabbcc' },
      // ]);
    }
    loadData();
  }, []);

  const handleMint = async () => {
    console.log('bankNo', bankNo);
    console.log('amount', amount);
    setMintLoad(true);
    const mintRes = await mint({ cardNo: bankNo, amount: amount });
    if (mintRes.code == -1) {
      setMintRes('mint fail');
      setMintLoad(false);
    } else {
      setMintRes('mint success, mint id is : ' + mintRes.data.id);
      setMintLoad(false);
    }
  };

  return (
    <div className="content">
      <div>
        <p className="contentTitle">Mint</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Row>
              <Col span={6}>
                <div className="subTitle">{'CardNo(银行卡号):'}</div>
              </Col>
              <Col span={18}>
                <Input
                  className="inputContent"
                  placeholder="card number"
                  onChange={(e) => {
                    if (e != null) {
                      setBankNo(e.target.value);
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <Row>
              <Col span={6}>
                <div className="subTitle">{'Amount(mint法币的数量):'}</div>
              </Col>
              <Col span={18}>
                <Input
                  className="inputContent"
                  placeholder="Amount"
                  onChange={(e) => {
                    if (e != null) {
                      setAmount(e.target.value);
                    }
                  }}
                />
              </Col>
            </Row>
          </div>
          <div style={{ paddingTop: '20px' }}>
            <Row>
              <Col span={6}>
                <Button type="primary" onClick={handleMint} loading={mintLoad}>
                  Mint
                </Button>
              </Col>
              <Col span={18}>
                <div className="result">
                  <p>mint result: {mintRes}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: '150px' }}>
        <p className="contentTitle">Mint History</p>
        <div className="contentInner">
          <div style={{ paddingTop: '20px' }}>
            <Table dataSource={mintList} columns={columns} pagination={false} size="small" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
