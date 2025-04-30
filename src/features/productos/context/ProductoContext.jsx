import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getProductos, 
  createProducto, 
  updateProducto, 
  deleteProducto 
} from '../services/productoService';

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
      setError(null);
    } catch (err) {
      setError(err.error || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (producto) => {
    try {
      const newProducto = await createProducto(producto);
      setProductos([...productos, newProducto]);
      return newProducto;
    } catch (err) {
      throw err;
    }
  };

  const editProducto = async (id, producto) => {
    try {
      const updatedProducto = await updateProducto(id, producto);
      setProductos(productos.map(prod => 
        prod._id === id ? updatedProducto : prod
      ));
      return updatedProducto;
    } catch (err) {
      throw err;
    }
  };

  const removeProducto = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter(prod => prod._id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductoContext.Provider
      value={{
        productos,
        loading,
        error,
        addProducto,
        editProducto,
        removeProducto,
        fetchProductos
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

export const useProductos = () => useContext(ProductoContext);