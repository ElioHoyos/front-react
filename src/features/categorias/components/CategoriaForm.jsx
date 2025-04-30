import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Typography, 
  Paper 
} from '@mui/material';

const CategoriaForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        descripcion: initialData.descripcion || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Editar Categoría' : 'Nueva Categoría'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            required
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {onCancel && (
              <Button variant="outlined" onClick={onCancel}>
                Cancelar
              </Button>
            )}
            <Button type="submit" variant="contained" color="primary">
              {initialData ? 'Actualizar' : 'Crear'}
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};

export default CategoriaForm;