import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CategoriaProvider } from './features/categorias/context/CategoriaContext';
import { ProductoProvider } from './features/productos/context/ProductoContext';
import Router from './routes/Router';

function App() {
  return (
    <BrowserRouter>
      <CategoriaProvider>
        <ProductoProvider>
          <Router />
        </ProductoProvider>
      </CategoriaProvider>
    </BrowserRouter>
  );
}

export default App;