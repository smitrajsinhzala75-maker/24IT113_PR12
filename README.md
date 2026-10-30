# Practical 12: CI/CD Pipeline with GitHub Actions
### Advanced Web Development Frameworks (ITUE301) — Semester 5
**Student ID:** `24IT113`  
**Student Name:** Smitrajsinh Zala  
**Institute:** Charotar University of Science and Technology (CHARUSAT) — CSPIT / DEPSTAR  

---

## 🚦 CI Pipeline Status
![CI Pipeline](https://github.com/smitrajsinh/Practical-12/actions/workflows/ci.yml/badge.svg)

---

## 🎯 Objectives
1. Automate testing of the Express.js Task Management application on every push to the `main` branch.
2. Configure a GitHub Actions workflow (`.github/workflows/ci.yml`) with:
   - Code checkout (`actions/checkout@v4`)
   - Node.js 18 setup (`actions/setup-node@v4`)
   - Dependency installation (`npm install`)
   - Automated testing execution (`npm test`)
3. Demonstrate a **failing pipeline (Red ❌)** caused by a deliberately broken test assertion.
4. Demonstrate a **passing pipeline (Green ✔️)** after correcting the test assertion.
5. Display a real-time CI status badge in the project repository.

---

## 📁 Repository Structure
```
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow definition
├── tests/
│   └── tasks.test.js       # Automated Jest & Supertest test suite
├── app.js                  # Express application & route definitions
├── server.js               # Server listener entrypoint
├── package.json            # Project dependencies & test scripts
├── .gitignore              # Ignores node_modules
└── README.md               # Documentation & CI status badge
```

---

## 🧪 Automated Test Suite
- `GET /tasks` — Returns HTTP 200 with all task items.
- `GET /tasks/1` — Returns HTTP 200 with specific task details.
- `GET /tasks/9999` — Returns HTTP 404 for non-existent IDs.
- `POST /tasks` — Valid task returns HTTP 201 Created.
- `POST /tasks` — Empty title returns HTTP 400 Validation Error.

---

## 🚀 How to Run Locally
```bash
# 1. Install dependencies
npm install

# 2. Run the test suite
npm test

# 3. Start the server
npm start
```
