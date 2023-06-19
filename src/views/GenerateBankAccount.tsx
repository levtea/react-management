import React from 'react';
import { Input, Col, Row, Button } from 'antd';
import { generateBankAccount } from '@/actions/generateBankAccount';
import '@/assets/styles/global.scss';

const View = () => {
  const [bankName, setBankName] = React.useState('');
  const [bankMobile, setBankMobile] = React.useState('');
  const [bankEmail, setBankEmail] = React.useState('');
  const [res, setRes] = React.useState('');
  const [load, setLoad] = React.useState<boolean>(false);

  // useEffect(() => {});

  const handleGenerate = async () => {
    setLoad(true);
    const generateRes = await generateBankAccount({ name: bankName, mobile: bankMobile, email: bankEmail });
    if (generateRes.code !== -1) {
      setLoad(false);
      setRes(generateRes.data);
    } else {
      setLoad(false);
      setRes('generate fail');
    }
  };

  return (
    <div className="content">
      <p className="contentTitle">Generate Mock Bank Account</p>
      <div className="contentInner">
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Name(银行用户名):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="bank account name"
                onChange={(e) => {
                  if (e != null) {
                    setBankName(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Mobile(银行用户电话号码):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Mobile"
                onChange={(e) => {
                  if (e != null) {
                    setBankMobile(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <div className="subTitle">{'Email(银行用户邮箱地址):'}</div>
            </Col>
            <Col span={18}>
              <Input
                className="inputContent"
                placeholder="Email"
                onChange={(e) => {
                  if (e != null) {
                    setBankEmail(e.target.value);
                  }
                }}
              />
            </Col>
          </Row>
        </div>
        <div style={{ paddingTop: '20px' }}>
          <Row>
            <Col span={6}>
              <Button type="primary" onClick={handleGenerate} loading={load}>
                Generate
              </Button>
            </Col>
            <Col span={18}>
              <div className="result">
                <p>generate result: {res}</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default View;
