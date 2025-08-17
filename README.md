# 🏢 UrbanVilla - Building Management System

A full-stack web application to manage a single apartment building system with **Admin**, **Member**, and **User** roles.

---

## 🔗 Live Links

- 🌐 **Live Site**: [urban-villlage.web.app](https://urban-villlage-c50c6.web.app)  
- ⚙️ **Server**: [vercel.app](https://b11a12-server-side-mdp-arvezsarkar.vercel.app)  
- 📦 **Client Repo**: [GitHub](https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-MDParvezsarkar)  
- 🔧 **Server Repo**: [GitHub](https://github.com/Programming-Hero-Web-Course4/b11a12-server-side-MDParvezsarkar)  

---

## ✨ Key Features

### 🏠 Public

- 🖼️ Stylish landing page with animated banner, map & facility icons  
- 🏘️ View all apartments with filter & pagination  
- 📝 Apply for apartment agreement (login required)  

### 🔐 Authentication

- 🔑 Firebase Email/Password + Google login  
- 🧩 Role-based protected routes  
- 🔒 Token verification using Firebase Admin SDK  

### 👤 User Dashboard

- 📇 Profile info: name, email, role  
- 📢 View latest announcements  

### 🧑‍💼 Member Dashboard

- 📃 View rental agreement (floor, block, room, rent)  
- 💳 Make rent payment using Stripe  
- 🏷️ Apply coupons for discounts  
- 📅 Select month for payment  
- 📜 View payment history  
- 📢 View all public announcements  

### 🛠️ Admin Dashboard

- 🧾 Admin profile with system stats:
  - 🏢 Total apartments  
  - 👥 Users vs Members  
  - 📊 Room availability percentage  
- 👥 Manage members (promote/demote)  
- 📣 Make announcements (manual + auto)  
- 📥 Handle agreement requests (accept/reject)  
- 🏷️ Manage coupons (add/edit/toggle)  

---

## 💡 Challenge Features (Implemented)

- ✅ Admin profile system stats  
- ✅ Toggle coupon availability  
- ✅ Due rent notice system  
  - 📬 Monthly warning to unpaid members  
  - 🛑 After 3 warnings → demoted to user  
  - 🧹 Agreement auto-deleted for free-up  
  - 📢 Announcement auto-created  
  - 🔔 Toast alert for demoted users  

---

## 🛠️ Technologies Used

- ⚛️ React.js + Vite  
- 🔐 Firebase Auth + Admin SDK  
- 🌐 Express.js + MongoDB  
- 💳 Stripe integration  
- 🎨 Tailwind CSS + DaisyUI  
- ⚙️ React Query, Axios  
- 🔁 React Router DOM  
- 🔒 JWT Middleware via Firebase  
- 🌍 Deployment: Firebase (Client) + Vercel (Server)  

---

## 📦 NPM Packages

```bash
react-router-dom  
@stripe/react-stripe-js  
@stripe/stripe-js  
firebase  
axios  
@tanstack/react-query  
react-hot-toast  
react-icons  
cors  
dotenv  
express  
mongoose  
# Urban-Villa-Client
