# 📚 Book Library Management system (Frontend)

A modern and responsive frontend application for managing a digital book library. Built with **React**, **TypeScript**, **Redux Toolkit**, **ShadCN UI**, **tract-hook-form** and **Tailwind CSS**.
---
🌐 Live Demo : https://library-ms-tau.vercel.app/
---

## 🚀 Features

- 📖 View all available books
- ➕ Add new books with validation
- ✏️ Edit book details
- 🗑️ Delete books
- 📦 Borrow a book (with due date and quantity)
- ✅ Real-time form validation and toast notifications
- 🧠 Clean and modular code structure

---

## 🛠️ Technologies Used

| Tech            | Description                      |
|-----------------|----------------------------------|
| React           | Frontend library                 |
| TypeScript      | Type-safe development            |
| Redux Toolkit   | State management (RTK Query used)|
| Tailwind CSS    | Utility-first CSS framework      |
| ShadCN UI       | Pre-styled UI components         |
| React Router    | Routing and navigation           |

---

## 🔧 Setup Instructions

   ```bash
   git clone https://github.com/your-username/book-library-frontend.git

   cd book-library-frontend

   npm install

   npm run dev
```
✅ Borrow Book Logic
- Check if the available copy is enough.

- Subtract borrowed quantity from total.

- If available copies become zero, mark as unavailable.

- Toast is shown after successful borrowing.

- Redirects to Borrow Summary Page.

---
### 🙌 Author
## Mahadi Hasan