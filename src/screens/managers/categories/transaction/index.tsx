import {Card} from 'antd';
import React from 'react';
import TransactionForm from './transactionForm';
import TransactionList from './transactionList';

export default function ManagerTransaction(props: any) {
  return (
    <>
      <Card>
        <TransactionForm />
        <TransactionList />
      </Card>
    </>
  );
}
