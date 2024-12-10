# 🛒💻 **Classifieds Web Application - Buy & Sell Used Products** 🛍️📦

Welcome to the **Classifieds Web Application** where users can easily buy and sell used products! 🏠 Whether you're looking to sell your old furniture or buy a used smartphone, this platform makes transactions simple and seamless. 🔄

---

## 🚀 **Features**

- 🛍️ **Buy Products**: Browse listings of used products and place orders.
- 💸 **Sell Products**: List your items for sale with images, descriptions, and prices.
- 🧑‍🤝‍🧑 **User Registration & Authentication**: Register, log in, and manage your profile.
- 📝 **Order Management**: Place orders, track status, and get notifications.
- 📦 **Product Management**: Update, delete, and mark products as sold.

---

## 🧰 **Tech Stack**

- **Frontend**: Angular 14 🅰️
- **Backend**: Node.js, Express 🖥️
- **Database**: MongoDB 💾
- **Other Libraries**:
  - Mongoose for MongoDB interaction
  - Multer for file uploads 📸
  - Bcrypt for password hashing 🔐
  - JWT for authentication 🔑

---

## ⚙️ **How to Set Up**

### 1️⃣ **Clone the Repository**

```bash
git clone https://github.com/Subramanian7986/classifieds-web-app.git
cd classifieds-web-app
```

### 2️⃣ **Install Backend Dependencies**

```bash
cd backend
npm install
```

### 3️⃣ **Set Up the Database**

Make sure you have **MongoDB** running locally:

```bash
mongod
```

### 4️⃣ **Seed the Database (Optional)**

```bash
node data/seed.js
```

### 5️⃣ **Start the Backend Server**

```bash
node server.js
```

The backend will run on `http://localhost:3000`.

### 6️⃣ **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

### 7️⃣ **Start the Frontend Server**

```bash
ng serve
```

The frontend will run on `http://localhost:4200`.

---

## 🛒 **API Endpoints**

- **GET** `/api/products/:status` - Get a list of products based on their status (Available, Selling, Sold).
- **POST** `/api/products/sell` - Sell a new product.
- **POST** `/api/products/purchase` - Purchase a product.
- **POST** `/api/users/register` - User registration.
- **POST** `/api/users/login` - User login.
- **GET** `/api/users/details/:userId` - Get the details of a user (sold, bought, and selling products).

---

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 **Contact**

Have questions? Reach out to us:

- **Email**: vsubramanianofficial@gmail.com 📧

---

Happy shopping and selling! 🛍️✨

