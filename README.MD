# 📌 Habit Tracker API Documentation

## 🚀 Overview
The **Habit Tracker API** helps users **track, manage, and analyze their habits** effectively. Users can **create habits, track progress, mark completion**, and **set reminders**.

### **🌍 Base URL**
```
http://localhost:3000
```

---

## 📌 Endpoints

### **1️⃣ Create a Habit**
- **Endpoint:** `POST /habits`
- **Description:** Creates a new habit.
- **Request Body (JSON Example):**
  ```json
  {
    "name": "Exercise",
    "description": "Exercise for 30 minutes",
    "goal": 30,
    "reminder": "2025-03-05T07:00:00Z",
    "category": "Health"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "_id": "some_generated_id",
    "name": "Exercise",
    "description": "Exercise for 30 minutes",
    "goal": 30,
    "completedDays": [],
    "reminder": "2025-03-05T07:00:00Z",
    "category": "Health",
    "createdAt": "2025-03-04T12:34:56Z"
  }
  ```

---

### **2️⃣ Get All Habits**
- **Endpoint:** `GET /habits`
- **Description:** Fetches all habits.
- **Response (200 OK):**
  ```json
  [
    {
      "_id": "some_id",
      "name": "Exercise",
      "description": "Exercise for 30 minutes",
      "goal": 30,
      "completedDays": [],
      "reminder": "2025-03-05T07:00:00Z",
      "category": "Health",
      "createdAt": "2025-03-04T12:34:56Z"
    }
  ]
  ```

---

### **3️⃣ Mark Habit as Completed**
- **Endpoint:** `PATCH /habits/{id}/complete`
- **Description:** Marks a habit as completed for a specific date.
- **Request Body (JSON Example):**
  ```json
  {
    "date": "2025-03-04T00:00:00Z"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Habit marked as completed",
    "habit": { ...updated_habit_object }
  }
  ```

---

### **4️⃣ Get Habit Progress**
- **Endpoint:** `GET /habits/progress`
- **Description:** Fetches habit progress details, including completion count.
- **Response (200 OK):**
  ```json
  [
    {
      "name": "Exercise",
      "completedDays": 5,
      "goal": 30
    }
  ]
  ```

---

### **5️⃣ Set a Reminder for a Habit**
- **Endpoint:** `POST /habits/reminder`
- **Description:** Sets a reminder for a habit.
- **Request Body (JSON Example):**
  ```json
  {
    "habitId": "replace_with_habit_id",
    "reminder": "2025-03-05T07:00:00Z"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Reminder set",
    "habit": { ...updated_habit_object }
  }
  ```

---

## 🛠️ Setup & Run

### **1️⃣ Install Dependencies**
```bash
npm install express mongoose dotenv cors body-parser
```

### **2️⃣ Create a `.env` File**
```
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

### **3️⃣ Start the Server**
```bash
node server.js
```
OR
```bash
npx nodemon server.js
```

✅ **Your Habit Tracker API is now running on `http://localhost:3000`!** 🚀