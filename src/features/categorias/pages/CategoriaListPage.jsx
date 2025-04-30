import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CategoriaList from '../components/CategoriaList';
import CategoriaForm from '../components/CategoriaForm';
import { useCategorias } from '../context/CategoriaContext';

const CategoriaListPage = () => {
  const navigate = useNavigate();
  const { addCategoria, editCategoria, removeCategoria } = useCategorias();
  const [editingCategoria, setEditingCategoria] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setEditingCategoria(null);
    setShowForm(true);
  };

  const handleEdit = (categoria) => {
    setEditingCategoria(categoria);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingCategoria) {
        await editCategoria(editingCategoria._id, formData);
      } else {
        await addCategoria(formData);
      }
      setShowForm(false);
    } catch (error) {
      console.error('Error al guardar categoría:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await removeCategoria(id);
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Categorías
        </Typography>
        
        {showForm ? (
          <CategoriaForm
            initialData={editingCategoria}
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
              Nueva Categoría
            </Button>
            <CategoriaList 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default CategoriaListPage;