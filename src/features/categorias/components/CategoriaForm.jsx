import React, { useState, useEffect }from "react";
import {
    TextField,
    Button,
    Stack,
    Typography,
    Paper
} from '@mui/material';

const CategoriaForm = ({initialData, onSubmit, onCancel}) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: ''
    });
    
}