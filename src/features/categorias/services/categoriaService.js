import axios from '../../../api/axios';

//get
export const getCategorias = async () => {
    const response = await axios.get('/categorias');
    return response.data;
};

//get{id} put
export const getCategoriaById = async (id) => {
    const response = await axios.get(`/categorias/${id}`);
    return response.data;
};

//post
export const crearCategoria = async (categoriaData) => {
    const response = await axios.post('/categorias',categoriaData);
    return response.data;
}

//patch
export const updateCategoria = async (id, categoriaData) => {
    const response = await axios.put(`/categorias/${id}`,categoriaData);
    return response.data;
}

//delete
export const deleteCategoria = async (id) => {
    const response = await axios.delete(`/categorias/${id}`);
    return response.data;
}