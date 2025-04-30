import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CategoriaListPage from '../features/categorias/pages/CategoriaListPage';
import ProductoListPage from '../features/productos/pages/ProductoListPage';
import Layout from '../components/Layout';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="categorias" element={<CategoriaListPage />} />
        <Route path="productos" element={<ProductoListPage />} />
      </Route>
    </Routes>
  );
};

export default Router;