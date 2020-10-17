import axios from 'axios';

const apiClient = axios.create({
    
    // baseURL: 'https://ancient-mesa-45444.herokuapp.com/api',
    baseURL: 'http://localhost:8000/api',
    headers: {
        Authorization: {
            toString () {
                return `Bearer ${localStorage.getItem('token')}`
              }
        }
    }
});

export default apiClient;