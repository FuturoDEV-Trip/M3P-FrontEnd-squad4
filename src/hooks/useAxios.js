import axios from "axios";

const useAxios = axios.create({
    baseURL: "http://localhost:3000"
});

useAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token') || localStorage.getItem('Token');
        console.log("Token no Request:", token); // Verifique se o token está correto

        if (token) {
            config.headers.Authorization = `${token}`;
        }
        config.headers['Content-Type'] = "application/json";
        return config;  
    },
    (error) => {
        console.error("Erro no Request:", error); // Log de erro
        return Promise.reject(error);
    }
);

// Interceptor para tratar respostas
useAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Erro na Resposta:", error); // Log detalhado do erro
        if (error.response) {
            if (error.response.status === 401) {
                alert("Sessão expirada ou não autorizado. Por favor, faça login novamente.");
                // Aqui você pode redirecionar para a página de login ou outra ação
            } else {
                console.error("Erro:", error.response.data); // Log do erro retornado pela API
            }
        }
        return Promise.reject(error);
    }
);

export default useAxios;