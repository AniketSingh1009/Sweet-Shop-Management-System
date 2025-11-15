import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'

interface AuthContextType {
  token: string | null
  email: string | null
  isAdmin: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'))
  const [isAdmin, setIsAdmin] = useState<boolean>(localStorage.getItem('isAdmin') === 'true')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = async (email: string, password: string) => {
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

  const register = async (email: string, password: string) => {
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
