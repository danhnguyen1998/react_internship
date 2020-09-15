import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Space} from 'antd';
import React, {useState} from 'react';
import firebase from 'utils/firebaseConfig';

export default function ClubForm(props: any) {
  const {Option} = Select;

  const [state, setState] = useState({
    visible: false,
    name: '',
    type: '',
    description: '',
  });

  const addNew = () => {
    setState((state) => ({...state, visible: true}));
  };

  const handleOk = (e) => {
    const walletRef = firebase.database().ref('Expenses');
    const walletData = {
      name: state.name,
      type: state.type,
      description: state.description,
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

  const onChangeSelect = (key, value) => {
    setState((state) => ({...state, type: value.value}));
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
          <Form.Item label="Tên danh mục">
            <Input name="name" onChange={handleOnChange} />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Select
              style={{width: 200}}
              placeholder="Select a type of expenses"
              optionFilterProp="children"
              onChange={onChangeSelect}>
              <Option value="Thu">Thu</Option>
              <Option value="Chi">Chi</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input name="description" onChange={handleOnChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
