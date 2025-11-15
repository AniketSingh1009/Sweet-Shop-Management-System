import { useState } from 'react'
import './SweetCard.css'

const SweetCard = ({ sweet, isAdmin, onPurchase, onEdit, onDelete, onRestock }) => {
  const [quantity, setQuantity] = useState(1)
  const [restockQty, setRestockQty] = useState(10)
  const [showRestock, setShowRestock] = useState(false)

  const handlePurchase = () => {
    if (quantity > 0 && quantity <= sweet.quantity_in_stock) {
      onPurchase(sweet.id, quantity)
      setQuantity(1)
    }
  }

  const handleRestock = () => {
    if (restockQty > 0) {
      onRestock(sweet.id, restockQty)
      setShowRestock(false)
      setRestockQty(10)
    }
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      chocolate: '🍫',
      candy: '🍬',
      gummy: '🍭',
      lollipop: '🍭',
      caramel: '🍮',
      cookie: '🍪',
      cake: '🍰',
      donut: '🍩',
      default: '🍬'
    }
    return emojis[category.toLowerCase()] || emojis.default
  }

  return (
    <div className="sweet-card">
      <div className="sweet-card-header">
        <div className="sweet-emoji">{getCategoryEmoji(sweet.category)}</div>
        {sweet.quantity_in_stock === 0 && (
          <span className="out-of-stock-badge">Out of Stock</span>
        )}
        {sweet.quantity_in_stock > 0 && sweet.quantity_in_stock < 10 && (
          <span className="low-stock-badge">Low Stock</span>
        )}
      </div>

      <div className="sweet-card-body">
        <h3 className="sweet-name">{sweet.name}</h3>
        <p className="sweet-category">{sweet.category}</p>
        <div className="sweet-price">₹{sweet.price.toFixed(2)}</div>
        <div className="sweet-stock">
          Stock: <span className={sweet.quantity_in_stock === 0 ? 'stock-zero' : ''}>{sweet.quantity_in_stock}</span> units
        </div>

        {!isAdmin && (
          <div className="purchase-section">
            <div className="quantity-selector">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={sweet.quantity_in_stock === 0}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={sweet.quantity_in_stock}
                disabled={sweet.quantity_in_stock === 0}
              />
              <button
                onClick={() => setQuantity(Math.min(sweet.quantity_in_stock, quantity + 1))}
                disabled={sweet.quantity_in_stock === 0}
              >
                +
              </button>
            </div>
            <button
              className="btn-purchase"
              onClick={handlePurchase}
              disabled={sweet.quantity_in_stock === 0}
            >
              {sweet.quantity_in_stock === 0 ? 'Out of Stock' : '🛒 Purchase'}
            </button>
          </div>
        )}

        {isAdmin && (
          <div className="admin-actions">
            <button className="btn-edit" onClick={() => onEdit(sweet)}>
              ✏️ Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(sweet.id)}>
              🗑️ Delete
            </button>
            <button className="btn-restock" onClick={() => setShowRestock(!showRestock)}>
              📦 Restock
            </button>
          </div>
        )}

        {isAdmin && showRestock && (
          <div className="restock-section">
            <input
              type="number"
              value={restockQty}
              onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
              min="1"
              placeholder="Quantity"
            />
            <button className="btn-confirm-restock" onClick={handleRestock}>
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SweetCard
