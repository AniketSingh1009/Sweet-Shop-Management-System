# 🍬 Sweet Shop - Full Stack Application

A beautiful, modern full-stack web application for managing and purchasing sweets online. Built with React frontend and Node.js/Express backend with PostgreSQL database.

![Status](https://img.shields.io/badge/status-working-brightgreen)
![Frontend](https://img.shields.io/badge/frontend-React-blue)
![Backend](https://img.shields.io/badge/backend-Node.js-green)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## ✨ Features

### 🎨 Beautiful Modern UI
- Gradient backgrounds with smooth animations
- Responsive design (mobile, tablet, desktop)
- Card-based layout with hover effects
- Playful candy emojis
- Professional typography

### 👤 User Features
- User registration and login
- Browse all available sweets
- Search sweets by name
- Filter by category and price range
- Purchase sweets with quantity selection
- Real-time stock availability
- Out of stock indicators

### 👨‍💼 Admin Features
- Add new sweets
- Edit existing sweets
- Delete sweets
- Restock inventory
- Admin badge display
- Full CRUD operations

### 🔒 Security
- Password hashing with bcrypt
- JWT authentication
- Role-based access control
- SQL injection prevention
- Input validation

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL
- npm or yarn

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd sweet_shop_project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Database

```bash
cd backend
npm run setup-db
```

### 3. Start Backend

```bash
cd backend
npm run dev
```
Backend runs on: **http://localhost:3000**

### 4. Start Frontend

Open a new terminal:

```bash
cd frontend
npm run dev
```
Frontend runs on: **http://localhost:5173**

---

## 🎯 Test It Out

### Admin Account
- Email: `admin@example.com`
- Password: `Admin@123`
- Access: Full admin features

### Regular User
- Email: `user@example.com`
- Password: `User@123`
- Access: Browse and purchase only

**Tip:** Any email containing "admin" gets admin privileges!

---

## 📁 Project Structure

```
sweet_shop_project/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth & admin middleware
│   │   ├── repositories/   # Database queries
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── types/          # TypeScript types
│   └── setup-db.ts         # Database setup
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Main pages
│   │   └── App.jsx        # Main app
│   └── public/            # Static assets
│
├── SETUP_AND_TEST.md      # Detailed testing guide
├── PROJECT_STATUS.md      # Complete status report
├── QUICK_REFERENCE.md     # Quick reference card
└── README.md              # This file
```

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Modern styling

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **TypeScript** - Type safety

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Sweets (Protected)
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search with filters
- `POST /api/sweets` - Add sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

---

## 🎨 Screenshots

### Login Page
Beautiful gradient background with smooth animations

### Dashboard
Grid layout with sweet cards, search, and filters

### Admin Panel
Full CRUD operations for managing sweets

---

## 🧪 Testing

### Run Backend Tests
```bash
cd backend
npm test
```

### Manual Testing
See [SETUP_AND_TEST.md](SETUP_AND_TEST.md) for comprehensive testing guide.

---

## 📚 Documentation

- **[SETUP_AND_TEST.md](SETUP_AND_TEST.md)** - Complete setup and testing guide
- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - Detailed project status
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference card
- **[frontend/README.md](frontend/README.md)** - Frontend documentation
- **[backend/API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)** - API documentation

---

## 🐛 Troubleshooting

### Backend Issues
```bash
# Reinstall dependencies
cd backend
rm -rf node_modules
npm install

# Reset database
npm run setup-db
```

### Frontend Issues
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules
npm install

# Clear cache
rm -rf node_modules/.vite
```

### Common Problems

**Can't connect to database?**
- Check PostgreSQL is running
- Verify `.env` file has correct credentials

**Frontend can't reach backend?**
- Ensure backend is running on port 3000
- Check proxy settings in `vite.config.js`

**Admin features not showing?**
- Email must contain "admin"
- Try logging out and back in

---

## 🎯 Features Checklist

- [x] User authentication (register/login)
- [x] JWT token management
- [x] Role-based access control
- [x] Browse sweets in grid layout
- [x] Search and filter functionality
- [x] Purchase with quantity selection
- [x] Stock management
- [x] Admin CRUD operations
- [x] Responsive design
- [x] Beautiful UI with animations
- [x] Error handling
- [x] Input validation
- [x] Security best practices

---

## 🚀 Deployment

### Backend
- Set environment variables
- Use production database
- Enable CORS for frontend domain
- Use proper JWT secret

### Frontend
- Build: `npm run build`
- Deploy `dist` folder
- Update API base URL

---

## 📝 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

Built with ❤️ for learning full-stack development

---

## 🎉 Status

✅ **FULLY WORKING** - Both frontend and backend are complete and integrated!

**Ready to use!** Just follow the Quick Start guide above.

---

## 📞 Support

For issues or questions:
1. Check [SETUP_AND_TEST.md](SETUP_AND_TEST.md)
2. Review [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
3. Check console logs for errors

---

**Enjoy your Sweet Shop! 🍬🍭🍫**
