import topSales from './fixtures/topSales';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000',
});

export default {
  async login(username, password) {
    const response = await instance.post('/auth/login', {
      username,
      password,
    });

    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
  },

  async getProducts() {
    const response = await instance.get('/products');

    return response.data;
  },

  async getProduct(id) {
    const response = await instance.get(`/products/${id}`);

    return response.data;
  },

  async createProduct(data) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post('/products', data, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async updateProduct(id, data) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.put(`/products/${id}`, data, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async deleteProduct(id) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async getTopSalesProducts() {
    return topSales;
  },

  async createCategory(data) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.post('/categories', data, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async getCategories() {
    const response = await instance.get(`/categories`);

    return response.data;
  },

  async deleteCategory(id) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/categories/${id}`, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async getUsers() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.get('users', { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async getOrders() {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.get('/orders', { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async createOrder(data) {
    const response = await instance.post('/orders', data);

    return response.data;
  },

  async completeOrder(id) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.put(`/orders/${id}`, { status: 'Hoan Thanh'}, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async deleteOrder(id) {
    const accessToken = localStorage.getItem('accessToken');
    const response = await instance.delete(`/orders/${id}`, { headers: { Authorization: `Bearer ${accessToken}` }});

    return response.data;
  },

  async uploadImage(image) {
    const formData = new FormData();
    formData.append('image', image);

    const response = await instance.post('https://api.imgbb.com/1/upload', formData, {
      params: { key: '144d78e3ab75c686c51f0fedb3741c7c' },
    });

    return response;
  },

  addToCart(item) {
    const cartJson = localStorage.getItem('cart');

    const cart = cartJson ? JSON.parse(cartJson) : { items: [] };

    cart.items.push(item);

    localStorage.setItem('cart', JSON.stringify(cart));
  },

  updateCart(index, item) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.items[index] = item;
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));

    cart.items[index] = null;
    cart.items = cart.items.filter(item => item !== null);

    localStorage.setItem('cart', JSON.stringify(cart));
  },

  clearCart() {
    localStorage.setItem('cart', JSON.stringify({ items: [] }));
  },

  getCart() {
    const cartJson = localStorage.getItem('cart');

    return cartJson ? JSON.parse(cartJson) : { items: [] };
  }
}