import axios from '../../../api/axios';

export const getCategorias = async () => {
  const response = await axios.get('/categorias');
  return response.data;
};

export const getCategoriaById = async (id) => {
  const response = await axios.get(`/categorias/${id}`);
  return response.data;
};

export const createCategoria = async (categoriaData) => {
  const response = await axios.post('/categorias', categoriaData);
  return response.data;
};

export const updateCategoria = async (id, categoriaData) => {
  const response = await axios.put(`/categorias/${id}`, categoriaData);
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await axios.delete(`/categorias/${id}`);
  return response.data;
};