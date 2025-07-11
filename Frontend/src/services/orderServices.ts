import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const createOrder = async (orderData: any) => {
  const response = await axios.post(`${API_URL}/orders`, orderData);
  return response.data;
};

const getOrderById = async (orderId: string) => {
  const response = await axios.get(`${API_URL}/orders/${orderId}`);
  return response.data;
};

const getMyOrders = async () => {
  const response = await axios.get(`${API_URL}/orders/myorders`);
  return response.data;
};

const cancelOrder = async (orderId: string) => {
  const response = await axios.put(`${API_URL}/orders/${orderId}/cancel`);
  return response.data;
};

const updateOrderToPaid = async (orderId: string, paymentResult: any) => {
  const response = await axios.put(`${API_URL}/orders/${orderId}/pay`, paymentResult);
  return response.data;
};

export const orderService = {
  createOrder,
  getOrderById,
  getMyOrders,
  cancelOrder,
  updateOrderToPaid
};