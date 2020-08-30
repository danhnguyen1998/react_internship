import {EditOutlined, HomeOutlined, MoneyCollectOutlined, TransactionOutlined, WalletOutlined} from '@ant-design/icons';
import {TFunction} from 'i18next';
import React, {lazy} from 'react';
import RouteTypes from './RouterTypes';

export const routeCustomer = (t: TFunction): RouteTypes => {
  return {
    routes: [
      {
        path: '/',
        breadcrumbName: t('common:customer.menu.home'),
        name: t('common:customer.menu.home'),
        icon: <HomeOutlined />,
      },
      {
        path: '/competition-sign-up',
        breadcrumbName: t('common:customer.menu.competitionSignup'),
        name: t('common:customer.menu.competitionSignup'),
        icon: <EditOutlined />,
      },
      {
        path: '/login',
        breadcrumbName: t('common:customer.menu.signin'),
        hideInMenu: true,
        name: t('common:customer.menu.signin'),
      },
    ],
  };
};

/** quản lý tài khoản */
const ManagerAccount = lazy(() => import('screens/managers/categories/expenses'));

export const routeManager = (t: TFunction): RouteTypes => {
  return {
    routes: [
      {
        path: '/manager',
        breadcrumbName: t('common:manager.menu.home'),
        name: t('common:manager.menu.home'),
        icon: <HomeOutlined />,
      },
      {
        path: '/manager/categories/wallet',
        name: t('common:manager.menu.categoriesWallet'),
        icon: <WalletOutlined />,
      },
      {
        path: '/manager/categories/expenses',
        breadcrumbName: t('common:manager.menu.categoriesMoney'),
        name: t('common:manager.menu.categoriesMoney'),
        icon: <MoneyCollectOutlined />,
      },
      {
        path: '/manager/categories/transaction',
        breadcrumbName: t('common:manager.menu.categoriesTrans'),
        name: t('common:manager.menu.categoriesTrans'),
        icon: <TransactionOutlined />,
      },
    ],
  };
};
