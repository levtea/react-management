import React from 'react';
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Mint', '/mint', <PieChartOutlined />),
  getItem('Generate Bank Account', '/generateBankAccount', <DesktopOutlined />),
  getItem('Automatic Mint', '/automaticMint', <PieChartOutlined />),
  getItem('Withdraw List', '/withdraw', <PieChartOutlined />),
];

const Comp: React.FC = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation();

  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  };

  return (
    <Menu theme="dark" defaultSelectedKeys={[currentRoute.pathname]} mode="inline" items={items} onClick={menuClick} />
  );
};

export default Comp;
