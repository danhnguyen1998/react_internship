import {Card} from 'antd';
import React from 'react';
import ExpensesForm from './expensesForm';
import ExpensesList from './expensesList';

export default function ManagerExpenses(props: any) {
  return (
    <>
      <Card>
        <ExpensesForm />
        <ExpensesList />
      </Card>
    </>
  );
}
