import axios, { AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export const getUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getUserById = async (id: number) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
}

