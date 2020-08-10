import {Card} from 'antd';
import React from 'react';
import LevelForm from './levelForm';
import LevelList from './levelList';

export default function ManagerLevel(props: any) {
  return (
    <>
      <Card>
        <LevelForm />
        <LevelList />
      </Card>
    </>
  );
}
