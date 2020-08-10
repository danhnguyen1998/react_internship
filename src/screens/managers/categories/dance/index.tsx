import {Card} from 'antd';
import React from 'react';
import DanceForm from './danceForm';
import DanceList from './danceList';

export default function ManagerDance(props: any) {
  return (
    <>
      <Card>
        <DanceForm />
        <DanceList />
      </Card>
    </>
  );
}
