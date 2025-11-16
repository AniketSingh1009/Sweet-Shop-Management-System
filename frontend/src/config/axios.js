import axios from 'axios'

// Get API URL from environment variable or use local development URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

console.log('🚀 API URL configured:', API_URL)

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

console.log('✅ Axios instance created with baseURL:', API_URL)

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
