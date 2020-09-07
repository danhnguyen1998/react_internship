import {BankOutlined, DeleteOutlined, EditOutlined, EnterOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Select, Tooltip} from 'antd';
import Table, {ColumnType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import firebase from 'utils/firebaseConfig';

export default function ClubList(props: any) {
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
    balance: '',
    id: '',
    transferId: '',
    transferBalance: 0,
    extraData: [],
  });
  const {id} = useParams();

  useEffect(() => {
    const transRef = firebase.database().ref('Transaction');
    setState((state) => ({...state, loading: true}));

    transRef.on('value', (snapshot) => {
      const trans = snapshot.val();
      const transList: any = [];

      for (const objId in trans) {
        if (trans[objId].walletId === id) {
          transList.push({objId, ...trans[objId]});
        }
      }

      setState((state) => ({...state, data: transList, extraData: transList, loading: false}));
    });
  }, []);

  const columns: ColumnType<object>[] = [
    {
      title: 'Số tiền giao dịch',
      dataIndex: 'amount',
      key: 'id',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'id',
    },
  ];

  const handleEditSave = () => {
    const walletRef = firebase.database().ref('Wallet').child(state.id);
    walletRef.update({
      name: state.name,
      balance: parseFloat(state.balance),
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

  const handleTransferSave = () => {
    const walletRef = firebase.database().ref('Wallet').child(state.id);
    const walletToRef = firebase.database().ref('Wallet').child(state.transferId);

    walletRef.update({
      balance: state.transferBalance - parseFloat(state.transferMoney),
    });
    walletToRef.update({
      balance: state.balance + parseFloat(state.transferMoney),
    });
    setState((state) => ({...state, visibleTransfer: false, transferMoney: ''}));
  };

  const toggleModalTransfer = (record) => () => {
    setState((state) => ({...state, visibleTransfer: true, id: record.id, transferBalance: record.balance}));
  };

  const toggleModalEdit = (record) => () => {
    setState((state) => ({...state, visibleEdit: true, name: record.name, balance: record.balance, id: record.id}));
  };

  const deleteWallet = (id) => () => {
    const walletRef = firebase.database().ref('Wallet').child(id);
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
            <Tooltip title={'Chuyển tiền'}>
              <Button size="small" type="primary" icon={<BankOutlined />} onClick={toggleModalTransfer(record)} />
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
              visible={state.visibleTransfer}
              footer={[
                <Button key="submit" type="primary" onClick={handleTransferSave}>
                  Lưu
                </Button>,
                <Button key="back" type="primary" danger={true} onClick={handleCancelTransfer}>
                  Đóng
                </Button>,
              ]}>
              <Form>
                <Form.Item label="Số tiền chuyển">
                  <Input name="transferMoney" onChange={handleOnChange} />
                </Form.Item>
                <Select
                  style={{width: 200}}
                  placeholder="Select a wallet"
                  optionFilterProp="children"
                  onChange={onChangeSelect}>
                  {state.data.map((wallet: any) => {
                    return (
                      <Option key={wallet.id} value={wallet.balance}>
                        {wallet.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form>
            </Modal>
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
                <Form.Item label="Tên ví">
                  <Input name="name" value={state.name} onChange={handleOnChange} />
                </Form.Item>
                <Form.Item label="Số dư khởi tạo">
                  <Input name="balance" value={state.balance} onChange={handleOnChange} />
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
      dataSource={state.data}
      bordered={true}
      size="small"
      pagination={state.pagination}
      loading={state.loading}
      // rowKey={(record) => record.i}
    />
  );
}
