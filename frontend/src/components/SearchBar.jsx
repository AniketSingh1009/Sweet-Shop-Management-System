import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = () => {
    onSearch({ name, category, minPrice, maxPrice })
  }

  const handleReset = () => {
    setName('')
    setCategory('')
    setMinPrice('')
    setMaxPrice('')
    onSearch({ name: '', category: '', minPrice: '', maxPrice: '' })
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="search-bar-container">
      <button className="search-toggle-btn" onClick={toggleDropdown}>
        <span className="search-icon">🔍</span>
        <span>Search & Filter</span>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>

      {isOpen && (
        <div className="search-dropdown">
          <div className="search-inputs">
            <div className="input-group">
              <label>🍬 Sweet Name</label>
              <input
                type="text"
                placeholder="Search by name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="input-group">
              <label>📦 Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="search-input"
              >
                <option value="">All Categories</option>
                <option value="Chocolate">🍫 Chocolate</option>
                <option value="Candy">🍬 Candy</option>
                <option value="Gummy">🍭 Gummy</option>
                <option value="Lollipop">🍭 Lollipop</option>
                <option value="Caramel">🍮 Caramel</option>
                <option value="Cookie">🍪 Cookie</option>
                <option value="Cake">🍰 Cake</option>
                <option value="Donut">🍩 Donut</option>
                <option value="Toffee">🍯 Toffee</option>
                <option value="Jelly">🟣 Jelly</option>
              </select>
            </div>

            <div className="input-group">
              <label>💰 Min Price (₹)</label>
              <input
                type="number"
                placeholder="Min price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="search-input price-input"
              />
            </div>

            <div className="input-group">
              <label>💰 Max Price (₹)</label>
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="search-input price-input"
              />
            </div>
          </div>
          
          <div className="search-buttons">
            <button className="btn-search" onClick={handleSearch}>
              🔍 Apply Filters
            </button>
            <button className="btn-reset" onClick={handleReset}>
              ↺ Reset
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBar
