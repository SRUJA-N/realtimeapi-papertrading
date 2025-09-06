# 📈 RealtimeAPI Paper Trading Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![Python](https://img.shields.io/badge/Python-3.8+-green.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

A full-stack paper trading platform that allows users to simulate cryptocurrency trading in real-time. The backend is built with FastAPI, providing RESTful APIs and WebSocket support for live market data. The frontend is a React application that offers an interactive user interface for authentication, portfolio management, and live trading.

## 🚀 Tech Stack

- **Backend:** FastAPI, SQLAlchemy, PostgreSQL, JWT Authentication, WebSockets
- **Frontend:** React, React Router, Axios, Chart.js
- **DevOps:** Docker, Docker Compose, NGINX

## ✨ Features

- 🔐 User authentication with signup and login
- 📊 Real-time cryptocurrency price updates via WebSockets
- 💼 Portfolio management with buy/sell trades
- 📈 Trade history tracking
- 📱 Responsive React frontend with protected routes

## 📸 Screenshots

<img width="1916" height="1078" alt="Screenshot 2025-09-06 233710" src="https://github.com/user-attachments/assets/90fa061c-7212-4822-b40f-e07245440979" />

<img width="1913" height="1079" alt="Screenshot 2025-09-06 233717" src="https://github.com/user-attachments/assets/1577462f-0412-4c42-ac52-7484a8b4c238" />

<img width="1919" height="1079" alt="Screenshot 2025-09-06 233834" src="https://github.com/user-attachments/assets/1e76176e-fc61-4b91-b014-631506840b8b" />

## 🛠️ Setup & Installation

### Prerequisites
- Docker and Docker Compose
- Git

### Quick Start with Docker
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/realtimeapi-papertrading.git
   cd realtimeapi-papertrading
   ```

2. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

### Manual Installation

#### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd realtimeapi-papertrading/backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the `backend` directory with the following variables:
   ```
   POSTGRES_USER=your_postgres_user
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_HOST=localhost
   POSTGRES_PORT=5431
   POSTGRES_DB=app_db
   SECRET_KEY=your_secret_key
   ```

5. Run the backend server:
   ```bash
   uvicorn backend.main:app --reload
   ```

#### Frontend
1. Navigate to the `front` directory:
   ```bash
   cd realtimeapi-papertrading/front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm run dev
   ```

## 🤝 Contributing Guidelines

- Fork the repository and create your branch from `main`.
- Ensure code is well-documented and tested.
- Follow PEP8 for Python and standard React best practices.
- Submit pull requests with clear descriptions of changes.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please open an issue on GitHub.



