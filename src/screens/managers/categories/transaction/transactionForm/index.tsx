import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'utils/firebaseConfig';

export default function TransactionForm(props: any) {
  const {Option} = Select;

  const {id} = useParams();
  const [state, setState] = useState({
    visible: false,
    amount: '1',
    note: '',
    expensesList: [],
    extraData: [],
    expensesId: '',
  });

  useEffect(() => {
    const expensesRef = firebase.database().ref('Expenses');
    setState((state) => ({...state, loading: true}));

    expensesRef.on('value', (snapshot) => {
      const expenses = snapshot.val();
      const expensesList: any = [];
      for (const id in expenses) {
        if (id) {
          expensesList.push({id, ...expenses[id]});
        }
      }

      setState((state) => ({...state, expensesList, extraData: expensesList, loading: false}));
    });
  }, []);

  const onChangeSelect = (key, value) => {
    console.log(value, '12');
    setState((state) => ({...state, expensesId: value.key}));
  };

  const addNew = () => {
    setState((state) => ({...state, visible: true}));
  };

  const handleOk = (e) => {
    console.log(state.expensesId, 'expensesId');
    const walletRef = firebase.database().ref('Transaction');
    const walletData = {
      amount: parseFloat(state.amount),
      note: state.note,
      walletId: id,
      expensesId: state.expensesId,
    };
    walletRef.push(walletData);
    setState((state) => ({...state, visible: false}));
  };

  const handleCancel = (e) => {
    setState((state) => ({...state, visible: false}));
  };

  const handleOnChange = (e) => {
    e.persist();
    setState((state) => ({...state, [e.target.name]: e.target.value}));
  };

  return (
    <>
      <Space style={{marginBottom: 15}}>
        <Button type="primary" icon={<PlusOutlined />} onClick={addNew}>
          Thêm mới
        </Button>
      </Space>
      <Modal
        closable={false}
        title={props.title}
        visible={state.visible}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Lưu
          </Button>,
          <Button key="back" type="primary" danger={true} onClick={handleCancel}>
            Đóng
          </Button>,
        ]}>
        <Form>
          <Form.Item label="Số tiền">
            <Input name="amount" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <Input name="note" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Expense">
            <Select
              style={{width: 200}}
              placeholder="Select an expense"
              optionFilterProp="children"
              onChange={onChangeSelect}>
              {state.expensesList.map((expenses: any) => {
                return (
                  <Option key={expenses.id} value={expenses.name}>
                    {expenses.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
