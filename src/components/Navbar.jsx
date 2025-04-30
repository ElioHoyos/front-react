import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{flexGrow:1}}>
                Tienda Virtual
            </Typography>
            <Button color="inherit" component={Link} to="/categorias">
                Categorías
            </Button>
            <Button color="inherit" component={Link} to="">
                Productos
            </Button>
            </Toolbar>
        </AppBar>
    )
};
export default Navbar;