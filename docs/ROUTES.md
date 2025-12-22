# Routes (Short Reference)

Public routes:
- `/` → Home
- `/about` → About
- `/contact` → Contact
- `/login` → User login
- `/signup` → User signup

Authenticated user routes:
- `/my-books` → My books
- `/profile` → My profile

Admin routes:
- `/admin/login` → Admin login
- `/admin/dashboard` → Dashboard
- `/admin/books` → View books
- `/admin/books/add` → Add book

Protect authenticated and admin routes via an auth wrapper or route guard.
