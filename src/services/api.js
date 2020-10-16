import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://ancient-mesa-45444.herokuapp.com/api',
    withCredentials: true,
});

export default apiClient;