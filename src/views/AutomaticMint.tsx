import React from 'react';
import { Input, Col, Row, Button } from 'antd';
import { automaticMint } from '@/actions/mint';
import '@/assets/styles/global.scss';

const View = () => {
  const [cardNo, setCardNo] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [mintRes, setMintRes] = React.useState('');
  const [mintLoad, setMintLoad] = React.useState<boolean>(false);

  // useEffect(() => {});

  const handleMint = async () => {
    console.log('cardNo', cardNo);
    console.log('amount', amount);
    console.log('address', address);
    const mintRes = await automaticMint({ cardNo: cardNo, amount: amount, address: address });
    if (mintRes.code == -1) {
      setMintRes('mint fail');
      setMintLoad(false);
    } else {
      setMintRes('mint success, mint id is : ' + mintRes.data);
      setMintLoad(false);
    }
  };

  return (
    <div className="content">
      <p className="contentTitle">Automatic Mint</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'CardNo(银行卡号):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="bank number"
                onChange={(e) => {
                  if (e != null) {
                    setCardNo(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Amount(Mint总额):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Mobile"
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
              <div className="subTitle">{'Address(??地址):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Email"
                onChange={(e) => {
                  if (e != null) {
                    setAddress(e.target.value);
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
  );
};

export default View;
