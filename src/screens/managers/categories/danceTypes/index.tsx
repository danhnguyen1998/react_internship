import {Card} from 'antd';
import React from 'react';
import DanceTypesForm from './danceTypesForm';
import DanceTypesList from './danceTypesList';

export default function ManagerDanceTypes(props: any) {
  return (
    <>
      <Card>
        <DanceTypesForm />
        <DanceTypesList />
      </Card>
    </>
  );
}
