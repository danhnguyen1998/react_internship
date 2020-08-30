import {EditOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import Table, {ColumnType} from 'antd/lib/table';
import React, {useEffect, useState} from 'react';
import firebase from 'utils/firebaseConfig';

export default function ClubList(props: any) {
  const [state, setState] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  });

  useEffect(() => {
    const walletRef = firebase.database().ref('Wallet');
    walletRef.on('value', (snapshot) => {
      const wallets = snapshot.val();
      const walletList: any = [];
      for (const id in wallets) {
        if (id) {
          walletList.push({id, ...wallets[id]});
        }
      }

      // wallets.map((index, item) => {
      //   walletList.push(item);
      // });

      console.log(walletList);
      setState((state) => ({...state, data: walletList}));
    });
  }, []);

  const columns: ColumnType<object>[] = [
    {
      title: 'Tên ví',
      dataIndex: 'name',
      key: 'id',
    },
    {
      title: 'Số dư',
      dataIndex: 'balance',
      align: 'center',
      key: 'id',
    },
  ];

  // const editWallet = () => {
  //   const todoRef = firebase.database().ref('Todo').child(todo.id);
  //   todoRef.update({
  //     complete: !todo.complete,
  //   });
  // };

  const deleteWallet = (id) => {
    const walletRef = firebase.database().ref('Wallet').child(id);
    walletRef.remove();
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
      width: 100,
      render: (_: any, record: any) => {
        return (
          <>
            <Tooltip title={'Sửa'}>
              <Button size="small" type="primary" icon={<EditOutlined />} />
            </Tooltip>{' '}
            <Tooltip title={'Xóa'}>
              {/* <Button size="small" type="primary" danger={true} 
              icon={<DeleteOutlined />} onClick={deleteWallet(id)} /> */}
            </Tooltip>
          </>
        );
      },
    });
    return listColumn;
  };

  console.log('list');

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
