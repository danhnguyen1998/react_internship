import {Card} from 'antd';
import React from 'react';
import AccountForm from './accountForm';
import AccountList from './accountList';

export default function ManagerAccount(props: any) {
  return (
    <>
      <Card>
        <AccountForm />
        <AccountList />
      </Card>
    </>
  );
}
