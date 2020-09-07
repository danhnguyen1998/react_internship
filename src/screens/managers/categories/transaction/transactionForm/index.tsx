import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space} from 'antd';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import firebase from 'utils/firebaseConfig';

export default function TransactionForm(props: any) {
  const {id} = useParams();
  const [state, setState] = useState({
    visible: false,
    amount: '1',
    note: '',
  });

  const addNew = () => {
    setState((state) => ({...state, visible: true}));
  };

  const handleOk = (e) => {
    const walletRef = firebase.database().ref('Transaction');
    const walletData = {
      amount: parseFloat(state.amount),
      note: state.note,
      walletId: id,
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
        </Form>
      </Modal>
    </>
  );
}
