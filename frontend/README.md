# Sweet Shop Frontend

A beautiful, modern React application for browsing and purchasing sweets.

## Features

### User Features
- 🔐 User registration and login
- 🍬 Browse all available sweets
- 🔍 Search and filter sweets by name, category, and price
- 🛒 Purchase sweets with quantity selection
- 📊 Real-time stock availability

### Admin Features
- ➕ Add new sweets
- ✏️ Edit existing sweets
- 🗑️ Delete sweets
- 📦 Restock inventory

## Tech Stack

- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Vite** - Build tool
- **CSS3** - Styling with modern gradients and animations

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Backend API running on http://localhost:3000

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AddSweetModal.jsx
│   │   ├── EditSweetModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── SearchBar.jsx
│   │   └── SweetCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
└── package.json
```

## API Integration

The frontend connects to the backend API with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/sweets` - Get all sweets
- `GET /api/sweets/search` - Search sweets
- `POST /api/sweets` - Add new sweet (Admin)
- `PUT /api/sweets/:id` - Update sweet (Admin)
- `DELETE /api/sweets/:id` - Delete sweet (Admin)
- `POST /api/sweets/:id/purchase` - Purchase sweet
- `POST /api/sweets/:id/restock` - Restock sweet (Admin)

## Admin Access

To access admin features, register with an email containing "admin" (e.g., admin@example.com).

## Design Features

- 🎨 Modern gradient backgrounds
- ✨ Smooth animations and transitions
- 📱 Fully responsive design
- 🎯 Intuitive user interface
- 🍭 Playful candy-themed emojis
- 🌈 Beautiful color palette

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
