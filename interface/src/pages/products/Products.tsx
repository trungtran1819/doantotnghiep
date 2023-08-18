import { Button, Table, Tag, Space, Modal } from 'antd';
import React, { useEffect, useState, createContext } from 'react';
import api from '../../services/api';
import ProductForm from './ProductForm';

const columns = (actions: any) => [
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  // {
  //   title: 'Danh mục',
  //   dataIndex: 'categories',
  //   key: 'categories',
  //   render: ((categories: any) => categories ? categories.map((category: string) => (
  //     <Tag color="blue" key={category}>
  //       {category}
  //     </Tag>
  //   )) : '')
  // },
  {
    title: 'Số lượng',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Giá',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
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

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deletingProduct, setDeletingProduct] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const result = await api.getProducts();
      setProducts(result);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onDelete = (id: any) => {
    const deletingProduct = products.find((product: any) => product.id === id);
    setDeletingProduct(deletingProduct);
  }

  const onDeleteConfirmed = async () => {
    setDeleting(true);
    try {
      await api.deleteProduct(deletingProduct.id);
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
    setDeleting(false);
  };

  const onDeleteCancelled = async () => {
    setDeletingProduct(null);
  };

  const onCreateProduct = () => {
    setShowProductForm(true);
  };

  const onEdit = (id: string) => {
    const editing= products.find((product: any) => product.id === id);
    setEditingProduct(editing);
    setShowProductForm(true);
  };

  return <>
    <div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '24px' }}>
        <Button type='primary' size='large' onClick={onCreateProduct}>Thêm sản phẩm</Button>
      </div>
      <Table columns={columns({ onDelete, onEdit })} dataSource={products}>
      </Table>
      <ProductForm editingProduct={editingProduct} onComplete={() => { fetchProducts() }} onClose={() => { setShowProductForm(false); setEditingProduct(null);}} open={showProductForm}></ProductForm>
      <Modal
        title="Xác nhận xoá sản phẩm"
        open={!!deletingProduct}
        onOk={onDeleteConfirmed}
        onCancel={onDeleteCancelled}
      >
        <p>Bạn có chắc chắn muốn xoá sản phẩm <b>{deletingProduct?.name}</b> không?</p>
      </Modal>
    </div>
  </>
};

export default Products;