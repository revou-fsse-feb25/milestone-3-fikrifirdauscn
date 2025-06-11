# 🛍️ Next.js Ecommerce App

Revoshop is a simple ecommerce web app built with **Next.js 15**, **Tailwind CSS**, **Zustand**, and **NextAuth**.

## ✨ Key Features

- ✅ Product listing and detail pages  
- ✅ Cart and Checkout (using Zustand)  
- ✅ Category-based filtering  
- ✅ Login with Credentials (NextAuth.js)  
- ✅ Route protection for admin & checkout (middleware)  
- ✅ Admin dashboard (product list)  
- ✅ Basic unit testing (Jest + React Testing Library)

## 🧪 Login Credentials

| Username | Password |
|----------|----------|
| `admin`  | `1234`   |

## 📁 Key Folder Structure

```
src/
├── app/
│   ├── admin/           # Admin page (protected)
│   ├── api/auth/        # NextAuth API
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout page
│   ├── component/       # UI components
│   ├── login/           # Login page
│   ├── product/[id]/    # Product detail
│   ├── store/           # Zustand store
│   ├── layout.js        # Root layout
│   └── page.js          # Homepage
├── middleware.js        # Route middleware
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env.local` file**
   ```env
   NEXTAUTH_SECRET=some_super_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

## 🔗 Public APIs Used

- [https://api.escuelajs.co/api/v1/products](https://api.escuelajs.co/api/v1/products)
- [https://api.escuelajs.co/api/v1/categories](https://api.escuelajs.co/api/v1/categories)

## 🛡️ Protected Routes

- `/admin` and `/checkout` are protected by middleware.
- Users must log in or be redirected to `/login`.

---

📘 Created by **Fikri Firdaus Cakra Negara**
