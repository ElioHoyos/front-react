import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Typography 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useCategorias } from '../context/CategoriaContext';

const CategoriaList = ({ onEdit, onDelete }) => {
  const { categorias, loading, error } = useCategorias();

  if (loading) return <Typography>Cargando categorías...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Descripción</TableCell>
            <TableCell>Fecha Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias.map((categoria) => (
            <TableRow key={categoria._id}>
              <TableCell>{categoria.nombre}</TableCell>
              <TableCell>{categoria.descripcion}</TableCell>
              <TableCell>
                {new Date(categoria.date_created).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(categoria)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(categoria._id)}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriaList;