import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Button, 
  Stack, 
  Typography, 
  Paper,
  MenuItem
} from '@mui/material';
import { useCategorias } from '../../categorias/context/CategoriaContext';

const ProductoForm = ({ initialData, onSubmit, onCancel }) => {
  const { categorias } = useCategorias();
  const [formData, setFormData] = useState({
    nombre: '',
    precio: 0,
    categoria_id: '',
    stock: 0,
    caracteristicas: {}
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        precio: initialData.precio || 0,
        categoria_id: initialData.categoria_id || '',
        stock: initialData.stock || 0,
        caracteristicas: initialData.caracteristicas || {}
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

  const handleCaracteristicaChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      caracteristicas: {
        ...prev.caracteristicas,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Editar Producto' : 'Nuevo Producto'}
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
            required
            label="Precio"
            name="precio"
            type="number"
            value={formData.precio}
            onChange={handleChange}
            fullWidth
            inputProps={{ step: "0.01" }}
          />
          
          <TextField
            required
            select
            label="Categoría"
            name="categoria_id"
            value={formData.categoria_id}
            onChange={handleChange}
            fullWidth
          >
            {categorias.map((categoria) => (
              <MenuItem key={categoria._id} value={categoria._id}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            fullWidth
          />
          
          <Typography variant="subtitle1">Características</Typography>
          <TextField
            label="Marca"
            name="marca"
            value={formData.caracteristicas.marca || ''}
            onChange={handleCaracteristicaChange}
            fullWidth
          />
          <TextField
            label="Color"
            name="color"
            value={formData.caracteristicas.color || ''}
            onChange={handleCaracteristicaChange}
            fullWidth
          />
          {}
          
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

export default ProductoForm;