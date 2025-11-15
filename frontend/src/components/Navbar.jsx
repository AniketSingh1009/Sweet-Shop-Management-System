import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const { email, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <span className="brand-icon">🍭</span>
          <span className="brand-name">Sweet Shop</span>
        </div>
        
        <div className="navbar-right">
          <div className="user-info">
            <span className="user-email">{email}</span>
            {isAdmin && <span className="admin-badge">Admin</span>}
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
