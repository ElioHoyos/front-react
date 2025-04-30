import React, {createContext,useContext,useState,useEffect} from "react";
import {
    getCategorias,
    crearCategoria,
    updateCategoria,
    deleteCategoria,
    updateCategoria
} from '../services/categoriaService';

const CategoriaContext = createContext();

export const CategoriaProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategorias = async () => {
        try {
            setLoading(true);
            const data = await getCategorias();
            setCategorias(data);
            setError(null);
        } catch (error) {
            setError(err.error || 'Error al cargar categorías');
        }finally{
            setLoading(false);
        }
    };

    const addCategoria = async (categoria) => {
        try {
            const newCategoria = await crearCategoria(categoria);
            setCategorias([...categorias,newCategoria]);
            return newCategoria;
        } catch (err) {
            throw err;
        }
    };

    const editCategoria = async (id, categoria) => {
        try {
            const updateCategoria = await updateCategoria(id, categoria);
            setCategorias(categorias.map(cat => 
                cat._id === id ? updateCategoria : cat
            ));
            return updateCategoria;
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
    },[]);

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