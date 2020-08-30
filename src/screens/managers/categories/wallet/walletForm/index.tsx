import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space} from 'antd';
import React, {useState} from 'react';
import firebase from 'utils/firebaseConfig';

export default function ClubForm(props: any) {
  const [state, setState] = useState({
    visible: false,
    name: '',
    balance: '',
  });

  const addNew = () => {
    setState((state) => ({...state, visible: true}));
  };

  const handleOk = (e) => {
    const walletRef = firebase.database().ref('Wallet');
    const walletData = {
      name: state.name,
      balance: parseFloat(state.balance),
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
        {/* <Search placeholder="input search text" enterButton="Tìm kiếm" onSearch={onSearch} /> */}
        {/* <Button type="primary" icon={<RedoOutlined />}>
          Làm mới
        </Button> */}
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
          <Form.Item label="Tên ví">
            <Input name="name" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Số dư khởi tạo">
            <Input name="balance" onChange={handleOnChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
