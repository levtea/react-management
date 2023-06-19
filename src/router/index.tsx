/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import Home from '@/views/Home';
import { Navigate } from 'react-router-dom';

const Mint = lazy(() => import('@/views/Mint'));
const GenerateBankAccount = lazy(() => import('@/views/GenerateBankAccount'));
const AutomaticMint = lazy(() => import('@/views/AutomaticMint'));
const WithdrawList = lazy(() => import('@/views/Withdraw'));

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);

const routes = [
  {
    path: '/',
    element: <Navigate to="/mint" />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/mint',
        element: withLoadingComponent(<Mint />),
      },
      {
        path: '/generateBankAccount',
        element: withLoadingComponent(<GenerateBankAccount />),
      },
      {
        path: '/automaticMint',
        element: withLoadingComponent(<AutomaticMint />),
      },
      {
        path: '/withdraw',
        element: withLoadingComponent(<WithdrawList />),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/mint" />,
  },
];

export default routes;
