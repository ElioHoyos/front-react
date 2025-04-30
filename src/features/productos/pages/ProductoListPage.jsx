import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ProductoForm from '../components/ProductoForm';
import { useProductos } from '../context/ProductoContext';
import { useCategorias } from '../../categorias/context/CategoriaContext';

const ProductoListPage = () => {
  const navigate = useNavigate();
  const { productos, loading, error, addProducto, editProducto, removeProducto } = useProductos();
  const { categorias } = useCategorias();
  const [editingProducto, setEditingProducto] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setEditingProducto(null);
    setShowForm(true);
  };

  const handleEdit = (producto) => {
    setEditingProducto(producto);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProducto) {
        await editProducto(editingProducto._id, formData);
      } else {
        await addProducto(formData);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar producto:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await removeProducto(id);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const getCategoriaNombre = (categoriaId) => {
    const categoria = categorias.find(cat => cat._id === categoriaId);
    return categoria ? categoria.nombre : 'Sin categoría';
  };

  if (loading) return <Typography>Cargando productos...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Productos
        </Typography>
        
        {showForm ? (
          <ProductoForm
            initialData={editingProducto}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <>
            <Button 
              variant="contained" 
              onClick={handleCreate}
              sx={{ mb: 2 }}
            >
              Nuevo Producto
            </Button>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell>Categoría</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto._id}>
                      <TableCell>{producto.nombre}</TableCell>
                      <TableCell>${producto.precio.toFixed(2)}</TableCell>
                      <TableCell>
                        {producto.categoria_id 
                          ? getCategoriaNombre(producto.categoria_id) 
                          : 'Sin categoría'}
                      </TableCell>
                      <TableCell>{producto.stock}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(producto)}>
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(producto._id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProductoListPage;