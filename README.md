# 📚 BookVerse — Book Recommendation App

Welcome to **BookVerse**, a full-stack app where readers can browse, rate, and recommend books.

Built with:
- ⚛️ React frontend
- 🧠 ASP.NET Core Web API backend
- 🗄️ SQLite database
- 🔐 JWT authentication for protected actions

---

## ✨ Highlights

- Browse all books
- Filter books by genre
- View recommended books
- Add, update, delete books (authenticated)
- Toggle recommendation status
- Clean UI with Bootstrap + toast notifications

---

## 🧱 Project Structure

```text
book-recommendation-app/
├── BookRecommedationApi/       # ASP.NET Core 8 API
│   ├── Controllers/            # Auth + book endpoints
│   ├── Data/                   # DbContext + seed data
│   ├── Models/                 # Book, User models
│   └── Services/               # JWT auth service
├── book-app/                   # React app
│   └── src/
│       ├── components/
│       └── services/
└── README.md
```

---

## 🚀 Run Locally

### 1) Start the API

```bash
cd /home/runner/work/book-recommendation-app/book-recommendation-app/BookRecommedationApi
dotnet restore
dotnet run --urls http://localhost:8080
```

API base URL: `http://localhost:8080/api`  
Swagger UI: `http://localhost:8080/swagger`

### 2) Start the Frontend

```bash
cd /home/runner/work/book-recommendation-app/book-recommendation-app/book-app
npm install
npm start
```

Frontend URL: `http://localhost:3000`

> The frontend uses `REACT_APP_API_URL` (defaults to `http://localhost:8080/api`).

---

## 🔐 Demo Login

Use this account to access protected routes:

- **Username:** `admin`
- **Password:** `admin123`

---

## 📡 API Snapshot

Public endpoints:
- `GET /api/books`
- `GET /api/books/{id}`
- `GET /api/books/genre/{genre}`
- `GET /api/books/recommended`
- `GET /api/books/rating/{minRating}`

Protected endpoints (JWT required):
- `POST /api/books`
- `PUT /api/books/{id}`
- `DELETE /api/books/{id}`
- `POST /api/books/{id}/recommend`

Auth:
- `POST /api/auth/login`

---

## 🌱 Seeded Data

The API seeds a starter shelf with books like:
- The Hobbit
- Dune
- 1984
- The Shining

So you can explore immediately after launch.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios, Bootstrap, React-Toastify
- **Backend:** ASP.NET Core 8, Entity Framework Core, JWT Auth
- **Database:** SQLite

---

## 📌 Note

This project is ideal for learning full-stack integration, auth flow, and CRUD APIs in a clean, beginner-friendly architecture.


## 👤 Author

**Raghava**: aspiring full stack .NET developer
[GitHub](https://github.com/raghava503) · [LinkedIn](https://linkedin.com/in/raghava-gudiwada-0b2bb4317)
