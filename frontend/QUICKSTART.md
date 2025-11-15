# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Backend (in another terminal)
```bash
cd backend
npm run dev
```
Backend should be running on http://localhost:3000

### 3. Start Frontend
```bash
cd frontend
npm run dev
```
Frontend will open on http://localhost:5173

## 🎯 First Time Setup

1. **Register an Account**
   - Go to http://localhost:5173
   - Click "Register here"
   - Use email: `admin@example.com` for admin access
   - Password: minimum 6 characters

2. **Add Some Sweets** (Admin only)
   - Click "+ Add New Sweet"
   - Fill in the details:
     - Name: e.g., "Chocolate Bar"
     - Category: e.g., "Chocolate"
     - Price: e.g., 2.99
     - Quantity: e.g., 50

3. **Start Shopping!**
   - Browse sweets
   - Use search filters
   - Select quantity and purchase

## 🎨 Features to Try

### As a User:
- ✅ Search sweets by name
- ✅ Filter by category
- ✅ Filter by price range
- ✅ Purchase sweets
- ✅ See stock availability

### As an Admin:
- ✅ Add new sweets
- ✅ Edit sweet details
- ✅ Delete sweets
- ✅ Restock inventory

## 🔑 Test Accounts

**Admin Account:**
- Email: admin@example.com
- Password: Admin@123

**Regular User:**
- Email: user@example.com
- Password: User@123

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in vite.config.js
server: {
  port: 5174  // Change to any available port
}
```

**Backend not connecting?**
- Make sure backend is running on port 3000
- Check vite.config.js proxy settings

**Can't login?**
- Make sure you registered first
- Check password is at least 6 characters
- Verify backend is running

## 📱 Mobile Testing

The app is fully responsive! Try it on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

Enjoy your Sweet Shop! 🍬🍭🍫
