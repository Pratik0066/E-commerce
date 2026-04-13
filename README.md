# 🚀 MY store - AI-Powered MERN E-Commerce

A professional, full-stack electronics e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js). This project features AI-driven product suggestions, a smart chatbot, and a dual payment system supporting Razorpay and Cryptocurrency.

## 🌟 Key Features

- **500+ Auto-Generated Products**: Fully populated electronics database using Faker.js with realistic Indian pricing (₹).
- **AI Product Assistant**: Integrated chatbot that scans the database to suggest products based on user queries.
- **Smart Recommendations**: AI-driven "Related Products" suggestions on product detail pages.
- **Dual Payment Gateway**: 
    - **Razorpay**: Support for UPI, NetBanking, and Cards.
    - **Crypto**: Secure cryptocurrency payment flow for modern tech enthusiasts.
- **Admin Dashboard**: Full CRUD functionality for products, orders, and user management.
- **Modern UI**: Built with Tailwind CSS and Lucide icons for a premium, high-tech aesthetic.
- **Advanced State Management**: Powered by Redux Toolkit for seamless cart and user authentication.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI/ML**: Regex-based Semantic Search (Ready for OpenAI/Gemini integration)
- **Payments**: Razorpay SDK, Crypto Payment Logic
- **Utilities**: Multer (Image Uploads), Faker.js (Data Seeding), React-Toastify

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local MongoDB
- Razorpay API Keys

### 2. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_uri
JWT_SECRET = your_jwt_secret
RAZORPAY_KEY_ID = your_key_id
RAZORPAY_KEY_SECRET = your_key_secret
```

### 3. Installation
```bash
# Install dependencies for both frontend and backend
npm install
cd frontend && npm install
```

### 4. Seed Data (500 Products)
```bash
# This will clear the DB and import 500 electronics products with actual images
npm run data:import
```

### 5. Run the Project
```bash
# Run both frontend and backend concurrently
npm run dev
```

---

## 📁 Project Structure
```text
├── backend/
│   ├── controllers/  # API logic (product, order, user)
│   ├── models/       # Mongoose Schemas (Product.js, User.js, etc.)
│   ├── routes/       # API endpoints
│   └── seeder.js     # 500-product generation script
├── frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI (AIChatBot, ProductCard, etc.)
│   │   ├── pages/      # Route pages (ProductEditPage, ProductListPage, etc.)
│   │   └── slices/     # Redux Toolkit state management
└── uploads/          # Local product images handled by Multer
```

---

## 🤖 AI Integration Details
The AI chatbot uses a keyword-extraction logic to parse user input and perform a regex search across `name`, `brand`, and `category` fields in MongoDB, providing instant product links to the user within the chat interface.

## 💳 Payment Flow
1. **Shipping**: User enters address.
2. **Payment Selection**: Choose between Razorpay or Crypto.
3. **Review**: Final order check.
4. **Execution**: Razorpay popup or Crypto wallet address generation.

---

## 📄 License
Distributed under the MIT License.
