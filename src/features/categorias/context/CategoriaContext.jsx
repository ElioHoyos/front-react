import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCategorias, 
  createCategoria, 
  updateCategoria, 
  deleteCategoria 
} from '../services/categoriaService';

const CategoriaContext = createContext();

export const CategoriaProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(data);
      setError(null);
    } catch (err) {
      setError(err.error || 'Error al cargar categorías');
    } finally {
      setLoading(false);
    }
  };

  const addCategoria = async (categoria) => {
    try {
      const newCategoria = await createCategoria(categoria);
      setCategorias([...categorias, newCategoria]);
      return newCategoria;
    } catch (err) {
      throw err;
    }
  };

  const editCategoria = async (id, categoria) => {
    try {
      const updatedCategoria = await updateCategoria(id, categoria);
      setCategorias(categorias.map(cat => 
        cat._id === id ? updatedCategoria : cat
      ));
      return updatedCategoria;
    } catch (err) {
      throw err;
    }
  };

  const removeCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      setCategorias(categorias.filter(cat => cat._id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  return (
    <CategoriaContext.Provider
      value={{
        categorias,
        loading,
        error,
        addCategoria,
        editCategoria,
        removeCategoria,
        fetchCategorias
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};

export const useCategorias = () => useContext(CategoriaContext);