# PotG 🏺✨

PotG is a simple web application where users can anonymously share messages of gratitude. It's a heartwarming place to remind ourselves of the good things in life.

## 🌐 Live Demo

> [PotG](https://potg-zeta.vercel.app/letters)

---

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/)
- **Database**: JSON file (for simplicity and prototyping)

---

## 📦 Features

- ✅ Add anonymous gratitude messages  
- ✅ View all submitted messages  
- ✅ Simple and clean user interface  
- ✅ Lightweight JSON-based backend  

---

## 🚀 Getting Started

### 1. Clone the repository

```
git clone https://github.com/your-username/gratitude-jar.git
cd gratitude-jar
```

### 2. Install backend dependencies

```
cd backend
npm install
```

### 3. Start backend server

```
node server.js
# or if you're using nodemon
# npx nodemon server.js
```

### 4. Install frontend dependencies

```
cd ../frontend
npm install
```

### 5. Start frontend

```
npm run dev
```

The app will be available at `http://localhost:5173`  
The backend will be running at `http://localhost:8000` (or your configured port)

---

## 🗂️ Project Structure

```
PotG/
├── backend/
│   ├── db.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   └── ...
└── README.md
```

---

## 📬 API Endpoints

### `GET /`

Returns a list of all gratitude messages.

**Response:**
```
[
  {
    "id": 1,
    "body": "Thank you for the sunshine!"
  },
  ...
]
```

### `POST /`

Submits a new gratitude message.

**Request body:**
```
{
  "id": "2"
  "message": "I appreciate my family."
}
```
