# 📚 Book Review API

A simple RESTful API built with Node.js, Express.js, and MongoDB for managing books and their reviews, with user authentication via JWT.

---

## 🚀 Features

- **User Authentication** (JWT-based)
  - `POST /signup` – Register a new user
  - `POST /login` – Login and receive a JWT token in cookies
  - `POST /logout` – Logout and clear the cookies

- **Book Management**
  - `POST /createBook` – Add a new book (Authenticated)
  - `GET /getBooks?page=1&limit=5&author=Tolkien&genre=Fantasy&search=ring` – View all books (with pagination, filter by author & genre) & Search books by title or author (partial, case-insensitive)
  - `GET /getbookById/:id?page=1&limit=5` – Get book details (average rating + paginated reviews)

- **Review Management**
  - `POST /addReview/:bookid` – Add a review (Authenticated, one per user/book)
  - `PUT /updateReview/:id` – Update your own review
  - `DELETE /deleteReview/:id` – Delete your own review

---

## 🧠 Design Decisions & Assumptions

- One review per user per book is enforced at the controller level.
- Reviews are paginated separately from the book details using query parameters.
- `Bearer <token>` format is required for authenticated endpoints.
- MongoDB is used with Mongoose for schema modeling and population.
- Clean folder structure and modular route/controllers for scalability.

---

## 🛠️ Tech Stack

- Node.js  
- Express.js  
- MongoDB with Mongoose  
- JWT for Authentication  
- dotenv for environment variables

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/billeasy_assignment
ACCESS_TOKEN_SECRET = "billeasy"

---

