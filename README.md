
**🧑‍💼 Employee Management System (EMS)**

A full-featured **Employee Management System** built with **React**, **Redux Toolkit**, and **Bootstrap**. EMS offers a role-based dashboard for managers and employees to manage tasks, salaries, communication, and more.

**🔗 Live Preview:**
[https://employee-management-system-coral-six.vercel.app/](https://employee-management-system-coral-six.vercel.app/)

---

**📋 Features**

**Manager Capabilities**

* Secure Login and Role-Based Routing
* Dashboard with Employee Summary
* Add / Edit / Delete Employee Records
* View Salary Slips for All Employees
* Access Tools: CSV Import, Slip Generation, Breakdown Viewer
* Chat with Employees

**Employee Capabilities**

* Secure Login with Personalized Access
* View Assigned Tasks
* Chat with Manager
* View and Download Salary Slips

**Shared Features**

* Clean and Responsive UI
* Modular Component Structure
* State Management via Redux Toolkit
* Private Routing for Protected Pages
* Sidebar Navigation & Dynamic Header
* Logout Functionality

---

**🧱 Tech Stack**

React – Frontend Framework
Redux Toolkit – State Management
React Router – Navigation & Routing
Bootstrap 5 – Responsive Styling
Vite – Frontend Build Tool
Vercel – Deployment Platform

---

**🧭 Route Structure**

**Authentication**

* `/` – Login Page
* `/logout` – Logout

**Manager Routes (Protected)**

* `/dashboard` – Dashboard with Summary + Table
* `/employee/add` – Add New Employee
* `/employee/edit/:id` – Edit Employee Info
* `/tools` – Manager Tools (CSV, Slip Gen, Breakdown)

**Employee Routes (Protected)**

* `/employee` – Employee Dashboard

**Shared Routes (Protected)**

* `/salary-slip` – Salary Slip Viewer
* `/chat` – Chat System

**Fallback**

* `*` – Not Found (404 Page)

---

**🚀 Getting Started Locally**

1. Clone the repository
   `git clone https://github.com/rudragondaliya/employee-management-system.git`

2. Navigate to the folder
   `cd employee-management-system`

3. Install dependencies
   `npm install`

4. Start the development server
   `npm run dev`

---

**📂 Project Structure Overview**

```
src/
│
├── assets/               → Images, logos  
├── components/
│   ├── Auth/             → Login, PrivateRoute  
│   ├── Manager/          → Forms, Tables  
│   ├── Employee/         → Salary Viewer, Chat  
│   ├── Shared/           → Header, Sidebar  
├── pages/                → Route Components  
├── redux/                → Slices and store.js  
└── App.jsx               → Main Routing File  
```

---

**🧑‍💻 Author**

Rudra Gondaliya
Feel free to connect and contribute!

---

**📜 License**

This project is licensed under the MIT License.
