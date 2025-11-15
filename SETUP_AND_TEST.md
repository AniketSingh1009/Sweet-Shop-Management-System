# Complete Setup and Testing Guide

## 🚀 Step-by-Step Setup

### 1. Database Setup

First, make sure PostgreSQL is running, then set up the database:

```bash
cd backend
npm install
npm run setup-db
```

This will create:
- `users` table with columns: id, email, password, role, created_at
- `sweets` table with columns: id, name, category, price, quantity_in_stock, created_at

### 2. Start Backend

```bash
cd backend
npm run dev
```

Backend will run on **http://localhost:3000**

### 3. Start Frontend

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on **http://localhost:5173**

## 🧪 Testing the Application

### Test 1: User Registration

1. Open http://localhost:5173
2. Click "Register here"
3. Enter:
   - Email: `user@example.com`
   - Password: `User@123`
   - Confirm Password: `User@123`
4. Click "Register"
5. ✅ You should be redirected to the dashboard

### Test 2: Admin Registration

1. Logout (click Logout button)
2. Go to Register
3. Enter:
   - Email: `admin@example.com`
   - Password: `Admin@123`
   - Confirm Password: `Admin@123`
4. Click "Register"
5. ✅ You should see "Admin" badge in navbar
6. ✅ You should see "+ Add New Sweet" button

### Test 3: Add Sweets (Admin Only)

1. Login as admin@example.com
2. Click "+ Add New Sweet"
3. Add these sweets:

**Sweet 1:**
- Name: Chocolate Bar
- Category: Chocolate
- Price: 2.99
- Quantity: 50

**Sweet 2:**
- Name: Gummy Bears
- Category: Gummy
- Price: 1.99
- Quantity: 100

**Sweet 3:**
- Name: Lollipop
- Category: Candy
- Price: 0.99
- Quantity: 5

**Sweet 4:**
- Name: Caramel Candy
- Category: Caramel
- Price: 3.49
- Quantity: 0

4. ✅ All sweets should appear in the grid

### Test 4: Search and Filter

1. Search by name: Type "Chocolate" → Should show only Chocolate Bar
2. Filter by category: Type "Gummy" → Should show only Gummy Bears
3. Filter by price: Min: 2, Max: 3 → Should show Chocolate Bar
4. Click "Reset" → Should show all sweets

### Test 5: Purchase (Regular User)

1. Logout and login as `user@example.com`
2. Find "Gummy Bears"
3. Change quantity to 5
4. Click "Purchase"
5. ✅ Stock should decrease from 100 to 95
6. Try to purchase "Caramel Candy" (out of stock)
7. ✅ Button should be disabled

### Test 6: Edit Sweet (Admin Only)

1. Logout and login as `admin@example.com`
2. Find "Chocolate Bar"
3. Click "Edit"
4. Change price to 3.99
5. Click "Update Sweet"
6. ✅ Price should update

### Test 7: Restock (Admin Only)

1. Find "Lollipop" (low stock - 5 items)
2. Click "Restock"
3. Enter quantity: 50
4. Click "Confirm"
5. ✅ Stock should increase to 55
6. ✅ "Low Stock" badge should disappear

### Test 8: Delete Sweet (Admin Only)

1. Find any sweet
2. Click "Delete"
3. Confirm deletion
4. ✅ Sweet should be removed from the list

## 🔍 API Endpoints Testing

You can also test the API directly:

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test@123"}'
```

### Get All Sweets
```bash
curl -X GET http://localhost:3000/api/sweets \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Add Sweet (Admin)
```bash
curl -X POST http://localhost:3000/api/sweets \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Sweet","category":"Test","price":1.99,"quantity_in_stock":10}'
```

### Purchase Sweet
```bash
curl -X POST http://localhost:3000/api/sweets/1/purchase \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"quantity":2}'
```

## ✅ Expected Behavior

### For Regular Users:
- ✅ Can register and login
- ✅ Can view all sweets
- ✅ Can search and filter sweets
- ✅ Can purchase sweets (if in stock)
- ✅ Cannot add, edit, or delete sweets
- ✅ Cannot restock sweets

### For Admin Users:
- ✅ Can do everything regular users can
- ✅ Can add new sweets
- ✅ Can edit existing sweets
- ✅ Can delete sweets
- ✅ Can restock sweets
- ✅ See "Admin" badge in navbar

## 🐛 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify `.env` file has correct database credentials
- Run `npm run setup-db` to create tables

### Frontend won't connect to backend
- Make sure backend is running on port 3000
- Check browser console for errors
- Verify proxy settings in `vite.config.js`

### Can't login
- Make sure you registered first
- Check password is at least 6 characters
- Verify backend is running

### Admin features not showing
- Make sure your email contains "admin"
- Try logging out and logging back in
- Check the "Admin" badge appears in navbar

## 📊 Database Verification

To check if everything is set up correctly:

```sql
-- Check users table
SELECT * FROM users;

-- Check sweets table
SELECT * FROM sweets;

-- Check table structure
\d users
\d sweets
```

## 🎉 Success Criteria

Your application is working correctly if:
- ✅ Users can register and login
- ✅ Admin users see admin features
- ✅ Sweets display in a beautiful grid
- ✅ Search and filters work
- ✅ Purchase decreases stock
- ✅ Out of stock items are disabled
- ✅ Admin can add/edit/delete/restock sweets
- ✅ UI is responsive on mobile/tablet/desktop
- ✅ No console errors
- ✅ Smooth animations and transitions

Enjoy your Sweet Shop! 🍬🍭🍫
