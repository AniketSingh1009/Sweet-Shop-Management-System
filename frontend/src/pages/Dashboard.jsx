import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from '../config/axios'
import Navbar from '../components/Navbar'
import SweetCard from '../components/SweetCard'
import AddSweetModal from '../components/AddSweetModal'
import EditSweetModal from '../components/EditSweetModal'
import SearchBar from '../components/SearchBar'
import './Dashboard.css'

const Dashboard = () => {
  const { isAdmin } = useAuth()
  const [sweets, setSweets] = useState([])
  const [filteredSweets, setFilteredSweets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSweet, setEditingSweet] = useState(null)

  useEffect(() => {
    fetchSweets()
  }, [])

  const fetchSweets = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/sweets')
      
      // Sort sweets: out of stock first, then low stock, then in stock
      const sortedSweets = response.data.sort((a, b) => {
        // Out of stock items (0) come first
        if (a.quantity_in_stock === 0 && b.quantity_in_stock !== 0) return -1
        if (a.quantity_in_stock !== 0 && b.quantity_in_stock === 0) return 1
        
        // Then low stock items (< 10)
        const aIsLowStock = a.quantity_in_stock > 0 && a.quantity_in_stock < 10
        const bIsLowStock = b.quantity_in_stock > 0 && b.quantity_in_stock < 10
        if (aIsLowStock && !bIsLowStock) return -1
        if (!aIsLowStock && bIsLowStock) return 1
        
        // Finally sort by name alphabetically
        return a.name.localeCompare(b.name)
      })
      
      setSweets(sortedSweets)
      setFilteredSweets(sortedSweets)
    } catch (err) {
      console.error('Failed to load sweets:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (searchParams) => {
    let filtered = [...sweets]

    if (searchParams.name) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchParams.name.toLowerCase())
      )
    }

    if (searchParams.category) {
      filtered = filtered.filter(sweet =>
        sweet.category.toLowerCase().includes(searchParams.category.toLowerCase())
      )
    }

    if (searchParams.minPrice) {
      filtered = filtered.filter(sweet => sweet.price >= parseFloat(searchParams.minPrice))
    }

    if (searchParams.maxPrice) {
      filtered = filtered.filter(sweet => sweet.price <= parseFloat(searchParams.maxPrice))
    }

    // Apply the same sorting: out of stock first, then low stock, then in stock
    filtered.sort((a, b) => {
      if (a.quantity_in_stock === 0 && b.quantity_in_stock !== 0) return -1
      if (a.quantity_in_stock !== 0 && b.quantity_in_stock === 0) return 1
      
      const aIsLowStock = a.quantity_in_stock > 0 && a.quantity_in_stock < 10
      const bIsLowStock = b.quantity_in_stock > 0 && b.quantity_in_stock < 10
      if (aIsLowStock && !bIsLowStock) return -1
      if (!aIsLowStock && bIsLowStock) return 1
      
      return a.name.localeCompare(b.name)
    })

    setFilteredSweets(filtered)
  }

  const handlePurchase = async (sweetId, quantity) => {
    try {
      await axios.post(`/api/sweets/${sweetId}/purchase`, { quantity })
      fetchSweets()
    } catch (err) {
      alert(err.response?.data?.error || 'Purchase failed')
    }
  }

  const handleDelete = async (sweetId) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return
    
    try {
      await axios.delete(`/api/sweets/${sweetId}`)
      fetchSweets()
    } catch (err) {
      alert('Failed to delete sweet')
    }
  }

  const handleRestock = async (sweetId, quantity) => {
    try {
      await axios.post(`/api/sweets/${sweetId}/restock`, { quantity })
      fetchSweets()
    } catch (err) {
      alert('Failed to restock')
    }
  }

  return (
    <div className="dashboard">
      <Navbar />
      
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1>🍬 Sweet Shop</h1>
            <p>Discover our delicious collection of sweets</p>
          </div>
          {isAdmin && (
            <button className="btn-add" onClick={() => setShowAddModal(true)}>
              + Add New Sweet
            </button>
          )}
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">🍭</div>
            <div className="stat-info">
              <div className="stat-value">{sweets.length}</div>
              <div className="stat-label">Total Sweets</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <div className="stat-value">{filteredSweets.length}</div>
              <div className="stat-label">Showing</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✨</div>
            <div className="stat-info">
              <div className="stat-value">{sweets.filter(s => s.quantity_in_stock > 0).length}</div>
              <div className="stat-label">In Stock</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-info">
              <div className="stat-value">
                {new Set(sweets.map(s => s.category)).size}
              </div>
              <div className="stat-label">Categories</div>
            </div>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {filteredSweets.filter(s => s.quantity_in_stock === 0).length > 0 && (
          <div className="alert-banner">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">
              <strong>{filteredSweets.filter(s => s.quantity_in_stock === 0).length}</strong> item(s) are currently out of stock (shown first)
            </span>
          </div>
        )}

        {loading ? (
          <div className="loading">Loading sweets...</div>
        ) : filteredSweets.length === 0 ? (
          <div className="no-results">
            <div className="empty-icon">🔍</div>
            <h3>No sweets found</h3>
            <p>Try adjusting your search filters</p>
          </div>
        ) : (
          <div className="sweets-grid">
            {filteredSweets.map(sweet => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                isAdmin={isAdmin}
                onPurchase={handlePurchase}
                onEdit={setEditingSweet}
                onDelete={handleDelete}
                onRestock={handleRestock}
              />
            ))}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddSweetModal
          onClose={() => setShowAddModal(false)}
          onSuccess={fetchSweets}
        />
      )}

      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onClose={() => setEditingSweet(null)}
          onSuccess={fetchSweets}
        />
      )}
    </div>
  )
}

export default Dashboard
