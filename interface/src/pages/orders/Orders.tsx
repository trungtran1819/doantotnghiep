import { Button, Table, Tag, Space, Modal } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';

const columns = (actions: any) => [
  {
    title: 'Khách hàng',
    dataIndex: 'customer',
    key: 'customerName',
    render: (customer: any) => <a>{customer.name}</a>
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'customer',
    key: 'customerPhone',
    render: (customer: any) => <div>{customer.phoneNumber}</div>
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'customer',
    key: 'customerAddress',
    render: (customer: any) => <div>{customer.address}</div>
  },
  {
    title: 'Sản phẩm',
    dataIndex: 'items',
    key: 'items',
    render: (items: any) => <>
      {items.map((item: any) => <div><a>{item.product.name}</a> x {item.quantity}</div>)}
    </>
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'created',
    key: 'created',
  },
  {
    title: '',
    key: 'actions',
    dataIndex: 'id',
    render: (id: any, column: any) => {
      return (
        <Space size="middle">
          { column.status !== 'Hoan Thanh' && <a onClick={() => { actions.onComplete(id) }}>Hoàn thành</a>}
          {column.status === 'Hoan Thanh' && <a onClick={() => { actions.onDelete(id) }}>Xoá</a>}
        </Space>
      );
    },
  }
];

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<any>(null);

  const fetchOrders = async () => {
    setLoading(true);
    const result = await api.getOrders();
    setOrders(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onDelete = (id: any) => {
    const deletingOrder = orders.find((order: any) => order.id === id);
    setDeleting(deletingOrder);
  }

  const onComplete = async (id: any) => {
    await api.completeOrder(id);
    fetchOrders();
  }

  const onDeleteConfirmed = async () => {
    setDeleting(true);
    await api.deleteOrder(deleting.id);
    setDeleting(false);
    fetchOrders();
  };

  const onDeleteCancelled = async () => {
    setDeleting(null);
  };

  return <>
    <div style={{ minHeight: 'calc(100vh - 200px)'}}>
      <Table columns={columns({ onDelete, onComplete })} dataSource={orders}>
      </Table>
      <Modal
        title="Xác nhận xoá đơn hàng"
        open={!!deleting}
        onOk={onDeleteConfirmed}
        onCancel={onDeleteCancelled}
      >
        <p>Bạn có chắc chắn muốn xoá đơn hàng <b>${deleting?.id}</b> không?</p>
      </Modal>
    </div>
  </>
};

export default Orders;