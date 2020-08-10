import {PlusOutlined, RedoOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Space} from 'antd';
import Search from 'antd/lib/input/Search';
import React, {useState} from 'react';

export default function ClubForm(props: any) {
  const [state, setState] = useState({
    visible: false,
  });

  const addNew = () => {
    setState((state) => ({...state, visible: true}));
  };

  const handleOk = (e) => {
    setState((state) => ({...state, visible: false}));
  };

  const handleCancel = (e) => {
    setState((state) => ({...state, visible: false}));
  };

  const onSearch = (value: string) => {
    console.log(value, 'value');
  };

  return (
    <>
      <Space style={{marginBottom: 15}}>
        <Search placeholder="input search text" enterButton="Tìm kiếm" onSearch={onSearch} />
        <Button type="primary" icon={<RedoOutlined />}>
          Làm mới
        </Button>
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
          <Form.Item label="Tài khoản">
            <Input />
          </Form.Item>
          <Form.Item label="Họ và tên">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
