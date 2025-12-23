# 📚 Book Store – Full-Stack Web Application

## About

**Book Store** is a fully developed online bookstore designed for buying and selling books, providing a seamless experience for both customers and administrators.

Users can browse books, add them to their cart, and complete purchases effortlessly. Administrators can manage products, track sales, and control inventory in a simple and secure way.

### Benefits for Customers
A ready-to-use project that allows selling books professionally online, with full management of products, customers, and sales.  
It delivers an excellent user experience that encourages customers to return again and again.

---

## Features

### 👤 User Features
- Secure user registration and authentication
- Browse and view detailed book information
- Add books to cart
- Smooth and responsive user interface

### 🛠 Admin Features
- Professional admin dashboard
- Create, update, and delete books (CRUD)
- Manage inventory and stock
- Manage users
- Full control over store content

### ⚙️ Technical Features
- RESTful API built with NestJS
- Clean and modular architecture
- State management using Zustand
- Full front-end and back-end integration
- MongoDB database
- Scalable and maintainable codebase

---

## Tech Stack

### Front-End
- React
- TypeScript
- Zustand
- Tailwind CSS

### Back-End
- NestJS
- Node.js
- MongoDB
- JWT Authentication

### Tools
- Git & GitHub
- Render / Netlify (Deployment)

---

## How to Run the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ZenZN99/Book-Store.git
cd book-store
2️⃣ Run Back-End (NestJS)
bash
Copy code
cd nest
npm install
npm run start:dev
Create a .env file in the backend root directory.

Environment Variables
Variable Name	Description	Example Value
PORT	Server port	5000
DATABASE_URL	MongoDB connection string	mongodb+srv://<user>:<password>@cluster/...
JWT_SECRET	JWT secret key	your_jwt_secret
JWT_EXPIRES_IN	JWT expiration time	7d
CLOUDINARY_CLOUD_NAME	Cloudinary cloud name	your_cloudinary_cloud_name
CLOUDINARY_API_KEY	Cloudinary API key	your_cloudinary_api_key
CLOUDINARY_API_SECRET	Cloudinary API secret	your_cloudinary_api_secret
ADMIN_EMAIL	Default admin email	admin@example.com
ADMIN_PASSWORD	Default admin password	admin_password

The server will run on:

arduino
Copy code
http://localhost:5000
3️⃣ Run Front-End (React)
bash
Copy code
cd react
npm install
npm run dev
The application will run on:

http://localhost:5173
```
🚀 The project is complete and ready for use, with future enhancements planned such as:

Reviews and ratings

Multi-language support

Dark / Light mode

Author
Zen
Full-Stack Software Engineer
Built with ❤️ using React & NestJS
ذذذ

يبب
