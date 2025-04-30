import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Container, Box } from '@mui/material';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Outlet />
        </Box>
      </Container>
    </>
  );
};

export default Layout;