# 👨‍💼 Admin Guide - Complete Tutorial

## 🔐 How to Become an Admin

### Method 1: Register with "admin" in Email
Any email containing the word "admin" automatically gets admin privileges.

**Examples of Admin Emails:**
- ✅ `admin@example.com`
- ✅ `myadmin@gmail.com`
- ✅ `john.admin@company.com`
- ✅ `administrator@shop.com`
- ✅ `sweetadmin@test.com`

**Not Admin Emails:**
- ❌ `user@example.com`
- ❌ `john@gmail.com`
- ❌ `customer@shop.com`

---

## 📝 Step-by-Step: Admin Registration

### 1. Open the Application
Go to: **http://localhost:5173**

### 2. Go to Register Page
- If you see the login page, click **"Register here"** at the bottom
- Or directly go to: http://localhost:5173/register

### 3. Fill Registration Form
```
┌─────────────────────────────────┐
│         🍭 Join Sweet Shop      │
│  Create an account to start     │
│         shopping                │
├─────────────────────────────────┤
│                                 │
│ Email:                          │
│ [admin@example.com]             │ ← Must contain "admin"
│                                 │
│ Password:                       │
│ [Admin@123]                     │ ← Min 6 characters
│                                 │
│ Confirm Password:               │
│ [Admin@123]                     │ ← Must match
│                                 │
│     [Register]                  │
│                                 │
│ Already have an account?        │
│ Login here                      │
└─────────────────────────────────┘
```

### 4. Click "Register"
- You'll be automatically logged in
- Redirected to dashboard
- You'll see "Admin" badge next to your email

---

## 🎯 Admin Dashboard Features

### What Admins See (vs Regular Users)

**Regular User Dashboard:**
```
┌─────────────────────────────────┐
│ 🍬 Sweet Shop                   │
│ user@example.com    [Logout]    │
├─────────────────────────────────┤
│ [Sweet Card]                    │
│ - View details                  │
│ - Purchase button               │
│ - Quantity selector             │
└─────────────────────────────────┘
```

**Admin Dashboard:**
```
┌─────────────────────────────────┐
│ 🍬 Sweet Shop                   │
│ admin@example.com [Admin] [Logout] │ ← Admin badge
│                [+ Add New Sweet]    │ ← Add button
├─────────────────────────────────┤
│ [Sweet Card]                    │
│ - View details                  │
│ - [✏️ Edit] button              │ ← Admin only
│ - [🗑️ Delete] button            │ ← Admin only
│ - [📦 Restock] button           │ ← Admin only
└─────────────────────────────────┘
```

---

## ➕ How to Add New Sweets

### Step 1: Click "+ Add New Sweet" Button
Located at the top right of the dashboard

### Step 2: Fill the Form
```
┌─────────────────────────────────┐
│     Add New Sweet          [×]  │
├─────────────────────────────────┤
│                                 │
│ Name:                           │
│ [Mango Candy]                   │
│                                 │
│ Category:                       │
│ [Candy]                         │
│                                 │
│ Price (₹):                      │
│ [25.00]                         │
│                                 │
│ Quantity in Stock:              │
│ [100]                           │
│                                 │
│ [Cancel]  [Add Sweet]           │
└─────────────────────────────────┘
```

### Step 3: Click "Add Sweet"
- Modal closes automatically
- New sweet appears in the grid
- Success! 🎉

### Example Sweets to Add:
```
Name: Mango Candy
Category: Candy
Price: 25.00
Quantity: 100

Name: Pistachio Chocolate
Category: Chocolate
Price: 120.00
Quantity: 50

Name: Strawberry Cake
Category: Cake
Price: 150.00
Quantity: 20
```

---

## ✏️ How to Edit/Update Sweets

### Step 1: Find the Sweet Card
Scroll through the dashboard to find the sweet you want to edit

### Step 2: Click "✏️ Edit" Button
Located in the admin actions section of the card

### Step 3: Update the Form
```
┌─────────────────────────────────┐
│     Edit Sweet             [×]  │
├─────────────────────────────────┤
│                                 │
│ Name:                           │
│ [Dark Chocolate Bar]            │ ← Can change
│                                 │
│ Category:                       │
│ [Chocolate]                     │ ← Can change
│                                 │
│ Price (₹):                      │
│ [50.00]                         │ ← Changed from 45
│                                 │
│ Quantity in Stock:              │
│ [150]                           │ ← Changed from 100
│                                 │
│ [Cancel]  [Update Sweet]        │
└─────────────────────────────────┘
```

### Step 4: Click "Update Sweet"
- Changes save immediately
- Card updates with new information
- Price and stock reflect new values

### Common Updates:
- **Price Change:** Increase/decrease price
- **Stock Update:** Change quantity
- **Name Fix:** Correct spelling
- **Category Change:** Move to different category

---

## 🗑️ How to Delete Sweets

### Step 1: Find the Sweet Card
Locate the sweet you want to remove

### Step 2: Click "🗑️ Delete" Button
Located in the admin actions section

### Step 3: Confirm Deletion
```
┌─────────────────────────────────┐
│  Are you sure you want to       │
│  delete this sweet?             │
│                                 │
│     [Cancel]  [OK]              │
└─────────────────────────────────┘
```

### Step 4: Click "OK"
- Sweet is permanently deleted
- Card disappears from grid
- Cannot be undone!

### ⚠️ Warning:
- Deletion is permanent
- No way to recover deleted sweets
- Make sure before deleting!

---

## 📦 How to Restock Sweets

### Step 1: Find the Sweet Card
Look for sweets with low or zero stock

### Step 2: Click "📦 Restock" Button
Located in the admin actions section

### Step 3: Enter Quantity
```
┌─────────────────────────────────┐
│ Ferrero Rocher                  │
│ Stock: 0 units                  │
│                                 │
│ [✏️ Edit] [🗑️ Delete]           │
│ [📦 Restock] ← Clicked          │
│                                 │
│ Restock quantity:               │
│ [50]                            │ ← Enter amount
│ [Confirm]                       │
└─────────────────────────────────┘
```

### Step 4: Click "Confirm"
- Stock increases by entered amount
- If was 0, becomes 50
- If was 10, becomes 60 (adds to existing)
- "Out of Stock" badge disappears

### Restock Examples:
```
Before: 0 units  → Add 50  → After: 50 units
Before: 5 units  → Add 20  → After: 25 units
Before: 100 units → Add 50 → After: 150 units
```

---

## 🎯 Complete Admin Workflow Example

### Scenario: Managing Chocolate Inventory

**1. Check Current Stock**
- Login as admin
- See "Ferrero Rocher" is out of stock (0 units)
- See "Dark Chocolate Bar" has low stock (5 units)

**2. Restock Out of Stock Item**
- Find "Ferrero Rocher"
- Click "📦 Restock"
- Enter: 100
- Click "Confirm"
- ✅ Now has 100 units

**3. Update Price**
- Find "Dark Chocolate Bar"
- Click "✏️ Edit"
- Change price from ₹45 to ₹50
- Click "Update Sweet"
- ✅ Price updated

**4. Add New Product**
- Click "+ Add New Sweet"
- Name: "Belgian Chocolate"
- Category: "Chocolate"
- Price: ₹180
- Quantity: 30
- Click "Add Sweet"
- ✅ New sweet added

**5. Remove Discontinued Item**
- Find old/discontinued sweet
- Click "🗑️ Delete"
- Confirm deletion
- ✅ Sweet removed

---

## 🔄 Admin vs User Comparison

| Feature | Regular User | Admin |
|---------|-------------|-------|
| View Sweets | ✅ Yes | ✅ Yes |
| Search/Filter | ✅ Yes | ✅ Yes |
| Purchase | ✅ Yes | ✅ Yes |
| Add New Sweet | ❌ No | ✅ Yes |
| Edit Sweet | ❌ No | ✅ Yes |
| Delete Sweet | ❌ No | ✅ Yes |
| Restock | ❌ No | ✅ Yes |
| Admin Badge | ❌ No | ✅ Yes |
| Add Button | ❌ No | ✅ Yes |

---

## 🎨 Visual Guide

### Admin Card Layout:
```
┌─────────────────────────────────┐
│         🍫                      │
│    [Out of Stock]               │ ← Status badge
├─────────────────────────────────┤
│ Ferrero Rocher                  │
│ Chocolate                       │
│ ₹250.00                         │
│ Stock: 0 units                  │
│                                 │
│ Admin Actions:                  │
│ [✏️ Edit]                       │ ← Edit button
│ [🗑️ Delete]                     │ ← Delete button
│ [📦 Restock]                    │ ← Restock button
│                                 │
│ (Restock form appears here)     │
└─────────────────────────────────┘
```

### Regular User Card Layout:
```
┌─────────────────────────────────┐
│         🍫                      │
│                                 │
├─────────────────────────────────┤
│ Dark Chocolate Bar              │
│ Chocolate                       │
│ ₹45.00                          │
│ Stock: 100 units                │
│                                 │
│ Quantity: [-] [1] [+]           │ ← Quantity selector
│ [🛒 Purchase]                   │ ← Purchase button
└─────────────────────────────────┘
```

---

## 💡 Pro Tips for Admins

### 1. **Bulk Restocking**
- Sort by out of stock (they appear first)
- Restock multiple items quickly
- Keep popular items well-stocked

### 2. **Price Management**
- Update prices during sales
- Adjust based on demand
- Keep prices competitive

### 3. **Inventory Monitoring**
- Check low stock items (orange badges)
- Restock before they run out
- Remove slow-moving items

### 4. **Category Organization**
- Use consistent category names
- Group similar items together
- Makes searching easier for users

### 5. **Stock Levels**
- Popular items: 100+ units
- Regular items: 50+ units
- Premium items: 20-30 units
- Limited edition: 5-10 units

---

## 🧪 Test Admin Features

### Quick Test Checklist:

**✅ Registration:**
- [ ] Register with admin@example.com
- [ ] See "Admin" badge in navbar
- [ ] See "+ Add New Sweet" button

**✅ Add Sweet:**
- [ ] Click "+ Add New Sweet"
- [ ] Fill all fields
- [ ] Submit form
- [ ] See new sweet in grid

**✅ Edit Sweet:**
- [ ] Find any sweet
- [ ] Click "Edit"
- [ ] Change price
- [ ] Save changes
- [ ] Verify update

**✅ Delete Sweet:**
- [ ] Find a sweet
- [ ] Click "Delete"
- [ ] Confirm deletion
- [ ] Verify removal

**✅ Restock:**
- [ ] Find out of stock item
- [ ] Click "Restock"
- [ ] Enter quantity
- [ ] Confirm
- [ ] Verify stock increase

---

## 🌐 Quick Access

**Application:** http://localhost:5173

**Test Admin Account:**
- Email: `admin@example.com`
- Password: `Admin@123`

**Or Create Your Own:**
- Any email with "admin" in it
- Password: minimum 6 characters

---

## 🎉 You're Ready!

Now you know how to:
- ✅ Register as admin
- ✅ Add new sweets
- ✅ Edit existing sweets
- ✅ Delete sweets
- ✅ Restock inventory
- ✅ Manage the sweet shop

**Go ahead and try it! 🍬**
