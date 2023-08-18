import { Button, Table, Tag, Space, Modal } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';

const { Column } = Table;

const columns = (actions: any) => [
  {
    title: 'Tên người dùng',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Vai trò',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Ngày cập nhật',
    dataIndex: 'updated',
    key: 'updated',
  },
  {
    title: '',
    key: 'actions',
    dataIndex: 'id',
    render: (id: any) => {
      console.log(id);

      return (
        <Space size="middle">
          <a onClick={actions.onEdit}>Sửa</a>
          <a onClick={actions.onDelete}>Xoá</a>
        </Space>
      );
    },
  }
];

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmingDelete, setConfirmingDelete] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    const result = await api.getUsers();
    setUsers(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <>
    <div style={{ minHeight: 'calc(100vh - 200px)'}}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
        <Button type='primary' size='large'>Thêm người dùng</Button>
      </div>
      <Table columns={columns({})} dataSource={users}>
      </Table>
      <Modal
        title="Xác nhận xoá người dùng"
        open={confirmingDelete}
      >
        <p>Bạn có chắc chắn muốn xoá sản phẩm <b>Trần Văn A</b> không?</p>
      </Modal>
    </div>
  </>
};

export default Users;