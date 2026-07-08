# Expense Tracker Dashboard

A full-stack Expense Tracker application built using the MERN Stack that helps users manage income and expenses, track financial activities, and visualize spending patterns through interactive charts.

## Features

- User Authentication (JWT)
- Secure Login & Registration
- Add Transactions
- Edit Transactions
- Delete Transactions
- Income & Expense Tracking
- Dashboard Analytics
- Income vs Expense Pie Chart
- Monthly Expense Bar Chart
- Search Transactions
- Category Filtering
- CSV Export
- Dark Mode
- Responsive Design
- MongoDB Atlas Integration

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Recharts
- React Router DOM

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

### Database
- MongoDB Atlas

## Project Structure

```bash
Expense-Tracker/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   └── package.json
│
├── .gitignore
├── README.md
└── .env.example
```

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker-dashboard.git
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run Backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Screenshots

Add your project screenshots here.

## Future Enhancements

- PDF Report Export
- Real Monthly Analytics
- Budget Planning
- Email Reports
- User Profile Management

## Author

**Sanyam Jain**

- LinkedIn: https://linkedin.com/in/sanyam07
- GitHub: https://github.com/sanyam-07