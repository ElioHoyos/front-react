import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api', //la url del backend de node.js
    timeout: 10000,
});

//Manejar errores globales
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error);
    }
);
export default instance;