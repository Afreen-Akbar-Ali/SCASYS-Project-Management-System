# SCASYS Project Management System

A web-based **HR Project Management System** developed using **Angular**, **ASP.NET Core Web API**, and **SQL Server**. The system helps organizations efficiently manage projects, tasks, employees, and project progress through a user-friendly interface.

---

## 📌 Project Overview

The SCASYS Project Management System is designed to simplify project management activities within an organization. It allows administrators and employees to manage projects, assign tasks, monitor progress, and generate reports.

---

## ✨ Features

- User Authentication (Login)
- Dashboard with project statistics
- Add, Edit and Delete Projects
- Add, Edit and Delete Tasks
- Add, Edit and Delete Users
- Task Assignment
- Project Progress Tracking
- Reports Dashboard
- Forgot Password Module
- Responsive User Interface

---

## 🛠 Technologies Used

### Frontend
- Angular
- TypeScript
- HTML
- CSS / SCSS
- Angular Material

### Backend
- ASP.NET Core 8 Web API
- C#
- Entity Framework Core

### Database
- Microsoft SQL Server

### Development Tools
- Visual Studio 2022
- Visual Studio Code
- SQL Server Management Studio (SSMS)
- Git & GitHub

---

## 📂 Project Structure

```
SCASYS-Project-Management-System
│
├── Frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── angular.json
│
├── Backend
│   └── ProjectManagement.API
│       ├── Controllers
│       ├── Models
│       ├── Services
│       ├── Program.cs
│       └── appsettings.json
│
├── Database
│   └── ProjectManagementDB.sql
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/Afreen-Akbar-Ali/SCASYS-Project-Management-System.git
```

---

## 2. Backend Setup

Open the backend project using Visual Studio.

Navigate to

```
Backend/ProjectManagement.API
```

Restore packages.

Update the SQL Server connection string inside

```
appsettings.json
```

Run the project.

The API will start at

```
https://localhost:xxxx
```

---

## 3. Frontend Setup

Navigate to

```
Frontend
```

Install dependencies

```bash
npm install
```

Run Angular

```bash
ng serve
```

Application runs at

```
http://localhost:4200
```

---

## 4. Database Setup

Open SQL Server Management Studio.

Create a new database named

```
ProjectManagement
```

Execute the SQL script located in

```
Database/ProjectManagementDB.sql
```

---

## 📊 Modules

- Authentication
- Dashboard
- Project Management
- Task Management
- User Management
- Reports

---

## 🚀 Future Enhancements

- Email Notifications
- Role Based Access Control
- File Upload Support
- Project Calendar
- Real-Time Notifications
- Mobile Application

---

## 👨‍💻 Developed By

**Afreen Akbar Ali**

Bachelor of Technology (Computer Science and Engineering)

---

## 📄 License

This project is developed for academic and educational purposes.
