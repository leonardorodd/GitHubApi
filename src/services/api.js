import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.github.com',
    auth: { username: 'leonardorodd', password: 'tecnoa180leo' },
    timeout: 15000,
});

export default api;
