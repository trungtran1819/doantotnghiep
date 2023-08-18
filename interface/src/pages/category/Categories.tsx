import { Button, Table, Tag, Space, Modal } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import CategoryForm from './CategoryForm';
import api from '../../services/api';

const columns = (actions: any) => [
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'customerName',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
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
    render: (id: any) => {
      return (
        <Space size="middle">
          <a onClick={() => actions.onEdit && actions.onEdit(id)}>Sửa</a>
          <a onClick={() => actions.onDelete && actions.onDelete(id)}>Xoá</a>
        </Space>
      );
    },
  }
];

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formOpened, setFormOpened] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selecting, setSelecting] = useState<any>(null);

  const fetchCategories = async () => {
    setLoading(true);
    const result = await api.getCategories();
    setCategories(result);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onDelete = (id: string) => {
    console.log(id);
    const item = categories.find((category: any) => category.id === id);
    console.log(item);
    setSelecting(item);
    setConfirmDelete(true);
  };

  const onEdit = (id: string) => {
    const item = categories.find((category: any) => category.id === id);
    setSelecting(item);
    console.log('Selecting item', item);
    setFormOpened(true);
  }

  const onDeleteConfirmed = async () => {
    try {
      await api.deleteCategory(selecting.id);
    } catch (err) {
      console.log(err);
    }
    fetchCategories();
    setSelecting(null);
    setConfirmDelete(false);
  }

  const onDeleteCancelled= async () => {
    setSelecting(null);
    setConfirmDelete(false);
  }

  return <>
    <div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
        <Button onClick={() => setFormOpened(true)} type='primary' size='large'>Tạo danh mục</Button>
      </div>
      <Table loading={loading} columns={columns({ onDelete, onEdit })} dataSource={categories}/>
      <CategoryForm selecting={selecting} onClose={() => { setFormOpened(false)}} open={formOpened}></CategoryForm>
      <Modal
        title="Xác nhận xoá sản phẩm"
        open={!!confirmDelete}
        onOk={onDeleteConfirmed}
        onCancel={onDeleteCancelled}
      >
        <p>Bạn có chắc chắn muốn xoá danh mục <b>{selecting?.name}</b> không?</p>
      </Modal>
    </div>
  </>
};

export default Categories;