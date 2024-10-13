import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxios = () => {
  const navigate = useNavigate();

  const apiBaseUrl = 'https://m3p-backend-squad4-34p5.onrender.com';

  // "http://localhost:3000";  URL base da sua API

  const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
  });

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
      navigate("/login");
      return false;
    }
    return true;
  };

  return { axiosInstance, checkAuth };
};

export default useAxios;