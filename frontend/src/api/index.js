import axios from 'axios'

export const createUser = (data) => axios.post('http://127.0.0.1:8000/api/add/', data)