# 💸 Cashly

**Cashly** is a simple and secure backend API for a money transfer application. It enables users to sign up, sign in, view balances, and transfer money between accounts using JWT-based authentication.

---

## 🚀 Features

- User authentication using **JWT**
- **MongoDB**-based user and account storage
- RESTful API endpoints for:
  - User Signup & Login
  - Profile update
  - Balance inquiry
  - Fund transfer between users
  - Bulk user search
- Passwords are hashed using **bcrypt**
- Follows modular folder structure for scalability

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Environment**: dotenv

---

## 📁 Folder Structure

```
cashly/
├── controllers/
│   ├── user.js
│   └── account.js
├── middleware/
│   └── auth.js
├── models/
│   └── User.js
├── routes/
│   ├── user.js
│   └── account.js
├── config.js
├── server.js
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/cashly.git
   cd cashly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file**
   ```env
   MONGO_DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```

---

## 🔑 API Endpoints

> Base URL: `http://localhost:3000/api/v1`

### Auth & User

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| POST   | `/user/signup`   | Register a new user   |
| POST   | `/user/signin`   | Login and get token   |
| PUT    | `/user/`         | Update user profile   |
| GET    | `/user/bulk`     | Search users (query param: `filter`) |

### Account

| Method | Endpoint             | Description              |
|--------|----------------------|--------------------------|
| GET    | `/account/balance`   | Get current balance      |
| POST   | `/account/transfer`  | Transfer money to another user |

> ⚠️ All account routes require a valid `Authorization: Bearer <token>` header.

---

## 🧪 Testing

You can test the API using **Postman**.  
Import the collection or test the routes manually using the steps provided above.

---

## 📌 Future Enhancements

- Admin dashboard for transactions
- Transaction history tracking
- Two-factor authentication (2FA)
- Rate-limiting to prevent abuse

---

## 🧑‍💻 Author

**Dev Khimani**  
🔗 [LinkedIn](https://www.linkedin.com/in/dev-khimani)  
📧 devkhimani@gmail.com

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
