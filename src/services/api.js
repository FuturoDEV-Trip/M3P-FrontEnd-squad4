import axios from 'axios';

export function api(endpoint, init) {
    
    const url =  `https://m3p-backend-squad4-34p5.onrender.com` + endpoint;
    return axios(url, init);
}