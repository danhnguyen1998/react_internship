import {Card} from 'antd';
import React from 'react';
import AgeForm from './ageForm';
import AgeList from './ageList';

export default function ManagerAge(props: any) {
  return (
    <>
      <Card>
        <AgeForm />
        <AgeList />
      </Card>
    </>
  );
}
