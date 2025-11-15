import { useState } from 'react'
import axios from 'axios'
import './Modal.css'

const AddSweetModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity_in_stock: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await axios.post('/api/sweets', {
        ...formData,
        price: parseFloat(formData.price),
        quantity_in_stock: parseInt(formData.quantity_in_stock)
      })
      onSuccess()
      onClose()
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add sweet')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Sweet</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Chocolate Bar"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="e.g., Chocolate"
            />
          </div>

          <div className="form-group">
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label>Quantity in Stock</label>
            <input
              type="number"
              name="quantity_in_stock"
              value={formData.quantity_in_stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddSweetModal
