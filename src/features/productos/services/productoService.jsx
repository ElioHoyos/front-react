import axios from '../../../api/axios';

export const getProductos = async () => {
  const response = await axios.get('/productos');
  return response.data;
};

export const getProductoById = async (id) => {
  const response = await axios.get(`/productos/${id}`);
  return response.data;
};

export const createProducto = async (productoData) => {
  const response = await axios.post('/productos', productoData);
  return response.data;
};

export const updateProducto = async (id, productoData) => {
  const response = await axios.put(`/productos/${id}`, productoData);
  return response.data;
};

export const deleteProducto = async (id) => {
  const response = await axios.delete(`/productos/${id}`);
  return response.data;
};