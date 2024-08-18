import axios from 'axios'

// CUSTOM AXIOS INSTANCE
export const customFetch = axios.create({
  baseURL: '/api/v1',
})
