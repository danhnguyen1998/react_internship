import {DeleteOutlined, EditOutlined, EnterOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Tooltip} from 'antd';
import Table, {ColumnType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import firebase from 'utils/firebaseConfig';

export default function ExpensesList(props: any) {
  const {Option} = Select;
  const history = useHistory();
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
    visibleTransfer: false,
    visibleEdit: false,
    transferMoney: '',
    name: '',
    description: '',
    id: '',
    transferId: '',
    transferBalance: 0,
    extraData: [],
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

      setState((state) => ({...state, data: expensesList, extraData: expensesList, loading: false}));
    });
  }, []);

  const columns: ColumnType<object>[] = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      align: 'center',
      key: 'type',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      align: 'center',
      key: 'description',
    },
  ];

  // const editWallet = () => {
  //   const todoRef = firebase.database().ref('Todo').child(todo.id);
  //   todoRef.update({
  //     complete: !todo.complete,
  //   });
  // };

  const handleEditSave = () => {
    const walletRef = firebase.database().ref('Expenses').child(state.id);
    walletRef.update({
      name: state.name,
      balance: state.description,
    });
    setState((state) => ({...state, visibleEdit: false}));
  };

  const handleCancelEdit = (e) => {
    setState((state) => ({...state, visibleEdit: false}));
  };

  const handleCancelTransfer = (e) => {
    setState((state) => ({...state, visibleTransfer: false}));
  };

  const handleOnChange = (e) => {
    e.persist();
    setState((state) => ({...state, [e.target.name]: e.target.value}));
  };

  const toggleModalTransfer = (record) => () => {
    setState((state) => ({...state, visibleTransfer: true, id: record.id, transferBalance: record.balance}));
  };

  const toggleModalEdit = (record) => () => {
    setState((state) => ({...state, visibleEdit: true, name: record.name, balance: record.balance, id: record.id}));
  };

  const deleteWallet = (id) => () => {
    const walletRef = firebase.database().ref('Expenses').child(id);
    walletRef.remove();
  };

  const onChangeSelect = (key, value) => {
    setState((state) => ({...state, transferId: value.key, balance: value.value}));
  };

  const goToTransaction = (id) => () => {
    history.push(`/manager/categories/transaction/${id}`);
  };

  const renderColumns = () => {
    const listColumn: ColumnType<object>[] = [];
    columns.map((item) =>
      listColumn.push({
        title: item.title,
        dataIndex: item.dataIndex,
        align: item.align || 'left',
        ellipsis: {showTitle: false},
        render: (value: any) => (
          <Tooltip placement="topLeft" title={value}>
            {value}
          </Tooltip>
        ),
      }),
    );
    listColumn.push({
      dataIndex: 'operation',
      align: 'center',
      width: 200,
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip title={'Xem chi tiết'}>
              <Button size="small" type="primary" icon={<EnterOutlined />} onClick={goToTransaction(record.id)} />
            </Tooltip>{' '}
            <Tooltip title={'Sửa'}>
              <Button size="small" type="primary" icon={<EditOutlined />} onClick={toggleModalEdit(record)} />
            </Tooltip>{' '}
            <Tooltip title={'Xóa'}>
              <Button
                size="small"
                type="primary"
                danger={true}
                icon={<DeleteOutlined />}
                onClick={deleteWallet(record.id)}
              />
            </Tooltip>
            <Modal
              closable={false}
              title={props.title}
              visible={state.visibleEdit}
              footer={[
                <Button key="submit" type="primary" onClick={handleEditSave}>
                  Lưu
                </Button>,
                <Button key="back" type="primary" danger={true} onClick={handleCancelEdit}>
                  Đóng
                </Button>,
              ]}>
              <Form>
                <Form.Item label="Tên danh mục">
                  <Input name="name" value={state.name} onChange={handleOnChange} />
                </Form.Item>
                <Form.Item label="Mô tả">
                  <Input name="description" value={state.description} onChange={handleOnChange} />
                </Form.Item>
              </Form>
            </Modal>
          </>
        );
      },
    });
    return listColumn;
  };

  return (
    <Table
      columns={renderColumns()}
      dataSource={state.data.length > 0 ? state.data : []}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      // rowKey={(record) => record.i}
    />
  );
}
