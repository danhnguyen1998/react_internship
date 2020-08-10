import {DeleteOutlined, FileSearchOutlined} from '@ant-design/icons';
import {Button, Tooltip} from 'antd';
import Table, {ColumnType} from 'antd/lib/table';
import React, {useState} from 'react';

export default function ClubList(props: any) {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Joe Black',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Jim Green',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  const columns: ColumnType<object>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  const [state, setState] = useState({
    data,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  });

  const edit = () => {
    console.log('sdasd');
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
            <Tooltip title={'Xem'}>
              <Button size="small" type="primary" icon={<FileSearchOutlined />} />
            </Tooltip>{' '}
            <Tooltip title={'Xóa'}>
              <Button size="small" type="primary" danger={true} icon={<DeleteOutlined />} />
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
    />
  );
}
