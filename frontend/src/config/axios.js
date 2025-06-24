import axios from 'axios'

export const axiosi = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    //TODO: de adaugat timeout
});
