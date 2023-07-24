import React from 'react';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const Comp: React.FC = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation();

  function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const mockBankItems: MenuItem[] = [
    getItem('Transfer For Mint', '/mock_bank/mint', <PieChartOutlined />),
    getItem('Generate Bank Account', '/mock_bank/generateBankAccount', <DesktopOutlined />),
    getItem('Automatic Mint', '/mock_bank/automaticMint', <PieChartOutlined />),
    getItem('Withdraw List', '/mock_bank/withdraw', <PieChartOutlined />),
  ];

  const auditBankItems: MenuItem[] = [getItem('Audit', '/audit/audit', <PieChartOutlined />)];

  const items: MenuItem[] = [
    getItem('Audit', 'audit', <PieChartOutlined />, auditBankItems),
    getItem('Mock Bank', 'mock_bank', <PieChartOutlined />, mockBankItems),
  ];

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  let firstOpenKey = '';
  function findKey(obj: { key: string }) {
    return obj.key === currentRoute.pathname;
  }
  for (let i = 0; i < items.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (items[i]!['children'] && items[i]!['children'].length > 0 && items[i]!['children'].find(findKey)) {
      firstOpenKey = items[i]?.key as string;
      break;
    }
  }

  const [openKeys, setOpenKeys] = useState([firstOpenKey]);

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys([keys[keys.length - 1]]);
    // console.log(keys);
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      mode="inline"
      items={items}
      onClick={menuClick}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
    />
  );
};

export default Comp;
