# 📈 Simulated Paper Trading Platform

A full-stack, real-time paper trading application built with a professional tech stack. This project allows users to sign up, log in, and practice trading with fake money, using a live-updating feed for stock prices and a real-time price chart. It is a comprehensive demonstration of full-stack development, real-time communication, and secure authentication.

## ✨ Key Features

* **User Authentication:** Secure user signup and login system using password hashing and **JWT (JSON Web Tokens)**.
* **Real-time Price Feed:** Live, ticking stock prices and a dynamic price chart implemented with **WebSockets**.
* **Simulated Trading:** Execute "BUY" and "SELL" orders, with backend logic to handle transactions.
* **Portfolio Tracking:** A live-updating view of the user's current stock holdings and their average buy price.
* **Trade History:** A complete log of all past transactions.




**Login & Signup Page**
`<img width="1914" height="1055" alt="Screenshot 2025-08-13 201746" src="https://github.com/user-attachments/assets/c9641fb1-0382-443a-8340-df5a71e3e30c" />
<img width="1919" height="1079" alt="Screenshot 2025-08-13 201752" src="https://github.com/user-attachments/assets/d4ad8bea-809c-44fe-942b-19badc093d1c" />

``<img width="1919" height="920" alt="image" src="https://github.com/user-attachments/assets/e6deca13-f87d-44a5-9411-80396bf936a0" />


## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, Axios, React Router, Chart.js |
| **Backend** | Python, FastAPI, SQLAlchemy |
| **Database** | PostgreSQL |
| **Infrastructure**| Docker, Docker Compose |
| **Authentication**| Passlib (bcrypt), python-jose (JWT) |
| **Real-time** | WebSockets |

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

You need to have the following software installed on your machine:
* Node.js (which includes npm)
* Python 3.10+
* Docker and Docker Compose

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SRUJA-N/Project-Paper-Trading.git
    cd Trading
    ```

2.  **Set Up the Backend:**
    * Navigate to the backend directory:
        ```bash
        cd backend
        ```
    * Create and activate a Python virtual environment:
        ```bash
        python -m venv my_env
        source my_env/Scripts/activate or ./my_env/Scripts/Activate # On Windows
        ```
    * Install the required Python packages:
        ```bash
        pip install -r requirements.txt
        ```
    * Start the PostgreSQL database using Docker:
        ```bash
        docker-compose up -d
        ```

3.  **Set Up the Frontend:**
    * Open a **new terminal**.
    * Navigate to the frontend directory:
        ```bash
        cd front
        ```
    * Install the required Node.js packages:
        ```bash
        npm install vite@latest
        npm start

        ```

### Running the Application

You will need two terminals running simultaneously.

1.  **Run the Backend Server:**
    * In your backend terminal (with the venv active) (my_env) PS C:\Users\hp\Desktop\test\Project-Paper-Trading\backend>, run:
        ```bash
        uvicorn main:app --reload
        ```
    * The backend will be running on `http://127.0.0.1:8000`.

2.  **Run the Frontend Server:**
    * In your front/src terminal, run:
        ```bash
        cd front
        npm run dev
        ```
    * The application will open in your browser at `http://localhost:5173`.

## 📝 API Endpoints

A brief overview of the main API endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/signup` | Creates a new user. |
| `POST` | `/login` | Authenticates a user and returns a JWT. |
| `GET` | `/users/me`| (Protected) Gets the current user's data. |
| `POST` | `/trade` | (Protected) Executes a new BUY or SELL trade. |
| `GET` | `/portfolio` | (Protected) Fetches the user's current portfolio. |
| `GET` | `/trade-history` | (Protected) Fetches the user's trade history. |
| `WS` | `/ws` | WebSocket endpoint for the real-time price feed. |
