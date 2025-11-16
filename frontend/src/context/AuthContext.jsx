import { createContext, useContext, useState, useEffect } from 'react'
import axios from '../config/axios'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [email, setEmail] = useState(localStorage.getItem('email'))
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true')
  const [loading, setLoading] = useState(false)

  // Token is now handled by axios interceptor in config/axios.js
  // No need for useEffect here

  const login = async (email, password) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      const { token } = response.data
      setToken(token)
      setEmail(email)
      const adminStatus = email.includes('admin')
      setIsAdmin(adminStatus)
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      localStorage.setItem('isAdmin', String(adminStatus))
    } finally {
      setLoading(false)
    }
  }

  const register = async (email, password) => {
    setLoading(true)
    try {
      const response = await axios.post('/api/auth/register', { email, password })
      const { token } = response.data
      setToken(token)
      setEmail(email)
      const adminStatus = email.includes('admin')
      setIsAdmin(adminStatus)
      localStorage.setItem('token', token)
      localStorage.setItem('email', email)
      localStorage.setItem('isAdmin', String(adminStatus))
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
    setIsAdmin(false)
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('isAdmin')
  }

  return (
    <AuthContext.Provider value={{ token, email, isAdmin, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
