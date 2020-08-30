import {Card} from 'antd';
import React from 'react';
import WalletForm from './walletForm';
import WalletList from './walletList';

export default function ManagerWallet(props: any) {
  return (
    <>
      <Card>
        <WalletForm />
        <WalletList />
      </Card>
    </>
  );
}
