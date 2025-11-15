# Quick Reference Card

## 🚀 Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 👤 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin@123 |
| User | user@example.com | User@123 |

## 🔑 Admin Detection

Any email containing "admin" gets admin privileges:
- ✅ admin@example.com
- ✅ myadmin@test.com
- ✅ test@admin.org

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Sweets (All require JWT token)
- `GET /api/sweets` - Get all
- `GET /api/sweets/search?name=...&category=...&minPrice=...&maxPrice=...` - Search
- `POST /api/sweets` - Add (Admin)
- `PUT /api/sweets/:id` - Update (Admin)
- `DELETE /api/sweets/:id` - Delete (Admin)
- `POST /api/sweets/:id/purchase` - Purchase
- `POST /api/sweets/:id/restock` - Restock (Admin)

## 🎨 Features Checklist

### User Features
- [x] Register & Login
- [x] Browse sweets
- [x] Search by name
- [x] Filter by category
- [x] Filter by price
- [x] Purchase sweets
- [x] View stock status

### Admin Features
- [x] All user features
- [x] Add sweets
- [x] Edit sweets
- [x] Delete sweets
- [x] Restock sweets
- [x] Admin badge

## 🐛 Quick Fixes

### Backend won't start
```bash
cd backend
npm install
npm run setup-db
```

### Frontend won't start
```bash
cd frontend
npm install
```

### Can't login
- Check backend is running
- Verify you registered first
- Password must be 6+ characters

### Admin features not showing
- Email must contain "admin"
- Logout and login again

## 📦 Sample Sweet Data

```json
{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity_in_stock": 50
}
```

## 🎯 Quick Test Flow

1. Register as admin@example.com
2. Add 3-4 sweets
3. Logout
4. Register as user@example.com
5. Purchase some sweets
6. Login back as admin
7. Restock and edit sweets

## 💡 Tips

- Use Chrome DevTools to see API calls
- Check Network tab for errors
- Console shows helpful logs
- Database changes persist
- Tokens stored in localStorage

## 🎨 Category Emojis

- Chocolate: 🍫
- Candy: 🍬
- Gummy: 🍭
- Lollipop: 🍭
- Caramel: 🍮
- Cookie: 🍪
- Cake: 🍰
- Donut: 🍩

---

**Everything is working! Enjoy! 🍬**
