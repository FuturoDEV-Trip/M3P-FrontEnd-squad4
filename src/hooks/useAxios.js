import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useAxios = () => {
  const navigate = useNavigate();

  const apiBaseUrl = "http://localhost:3000"; // URL base da sua API

  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

  // Interceptar requisições para adicionar o token de autorização
  axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Você precisa estar logado para acessar esta página.");
      navigate("/login"); // Redireciona para a página de login
      return false;
    }
    return true;
  };

  return { axiosInstance, checkAuth };
};

export default useAxios;