                                                                                                  or 


# 📈 Paper Trading Platform

A full-stack paper trading application built with React, FastAPI, and PostgreSQL, all containerized with Docker. This platform simulates live stock market data and allows users to practice trading without real money.

## ✨ Features

* **User Authentication**: Secure user registration and JWT-based login.
* **Real-Time Data**: Live stock data streamed via WebSockets.
* **Trade Execution**: Buy and sell stocks with a simple interface.
* **Portfolio Management**: View all current holdings with average price and quantity.
* **Trade History**: Keep a record of all past trades.
* **Dockerized**: The entire application can be launched with a single command.



## 🚀 Getting Started
<img width="1919" height="920" alt="Screenshot 2025-08-14 101607" src="https://github.com/user-attachments/assets/1bfe64e5-1be9-4044-9ba4-386769377fa8" />


Follow these instructions to get a copy of the project up and running on your local machine.

### **Prerequisites**

You must have the following software installed on your machine:
* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/products/docker-desktop/) and Docker Compose

### **Installation**

1.  **Clone the repository**
    Open your terminal and clone the project using this command:
    ```bash
    git clone https://github.com/SRUJA-N/papertrading-docker.git
    ```

2.  **Navigate to the project directory**
    ```bash
    cd papertrading-docker
    ```

3.  **Build and run the application**
    Use Docker Compose to build the images and launch all the services. This single command does everything for you.
    ```bash
    docker-compose up --build -d
    ```

4.  **Access the application**
    Once the containers are running, you can access the frontend in your browser at:
    * **Frontend**: `http://localhost:5173`

    The other services are also running:
    * **Backend API**: `http://localhost:8000`
    * **API Docs**: `http://localhost:8000/docs`

---
