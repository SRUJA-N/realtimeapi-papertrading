# Low-Level Design (LLD) for RealtimeAPI Paper Trading Platform

## 1. Introduction
This document provides detailed design specifications for the RealtimeAPI Paper Trading Platform, complementing the High-Level Design (HLD) by describing the internal workings, data models, API endpoints, and component interactions.

## 2. Database Schema

### 2.1 Users Table
| Column          | Type      | Constraints           | Description                  |
|-----------------|-----------|-----------------------|------------------------------|
| id              | Integer   | Primary Key           | Unique user identifier       |
| email           | String    | Unique, Not Null      | User email                   |
| hashed_password | String    | Not Null              | Hashed password              |
| created_at      | DateTime  | Default current time  | Account creation timestamp   |

### 2.2 Portfolio Table
| Column    | Type    | Constraints           | Description                      |
|-----------|---------|-----------------------|---------------------------------|
| id        | Integer | Primary Key           | Unique portfolio entry ID       |
| user_id   | Integer | Foreign Key (users.id) | Owner user ID                   |
| symbol    | String  | Not Null              | Cryptocurrency symbol           |
| quantity  | Integer | Not Null              | Number of coins held            |
| avg_price | Float   | Not Null              | Average purchase price          |

### 2.3 Trades Table
| Column     | Type     | Constraints           | Description                      |
|------------|----------|-----------------------|---------------------------------|
| id         | Integer  | Primary Key           | Unique trade ID                 |
| user_id    | Integer  | Foreign Key (users.id) | Owner user ID                   |
| symbol     | String   | Not Null              | Cryptocurrency symbol           |
| trade_type | String   | Not Null              | BUY or SELL                    |
| quantity   | Integer  | Not Null              | Number of coins traded          |
| price      | Float    | Not Null              | Trade price                    |
| timestamp  | DateTime | Default current time  | Trade execution time            |

## 3. API Endpoints

### 3.1 Authentication
- **POST /signup**
  - Request: UserCreate schema (email, password, confirm_password)
  - Response: UserOut schema (id, email, created_at)
  - Description: Registers a new user with hashed password.

- **POST /login**
  - Request: OAuth2PasswordRequestForm (username=email, password)
  - Response: Token schema (access_token, token_type)
  - Description: Authenticates user and returns JWT token.

- **GET /users/me**
  - Request: JWT token in Authorization header
  - Response: UserOut schema
  - Description: Returns current authenticated user info.

### 3.2 Trading
- **POST /trade**
  - Request: TradeBase schema (symbol, trade_type, quantity, price)
  - Response: Success message
  - Description: Executes a buy or sell trade, updates portfolio and trade history.

### 3.3 Portfolio
- **GET /portfolio**
  - Request: JWT token in Authorization header
  - Response: List of Portfolio schema objects
  - Description: Retrieves current user's portfolio holdings.

### 3.4 WebSocket
- **/ws/{ticker}**
  - Description: Provides real-time price updates for the specified cryptocurrency ticker.
  - Messages: JSON objects with stock symbol, price, volume, and change percentage.

## 4. Component Interactions

### 4.1 Trade Execution Flow
1. Frontend sends authenticated POST request to `/trade`.
2. Backend validates trade type and user holdings.
3. Portfolio is updated or created accordingly.
4. Trade record is inserted.
5. Database transaction commits changes.
6. Response sent to frontend.

### 4.2 Real-time Price Updates
1. Frontend opens WebSocket connection to `/ws/{ticker}`.
2. Backend maintains active ticker state with price and volume.
3. Price changes are simulated and broadcast every second.
4. Frontend updates UI with received data.

## 5. Class and Function Details

### 5.1 User Model (models.py)
- Attributes: id, email, hashed_password, created_at
- Relationships: portfolio (one-to-many), trades (one-to-many)

### 5.2 Portfolio Model
- Attributes: id, user_id, symbol, quantity, avg_price
- Relationship: owner (User)

### 5.3 Trade Model
- Attributes: id, user_id, symbol, trade_type, quantity, price, timestamp
- Relationship: owner (User)

### 5.4 Auth Router (auth.py)
- Functions: signup, login, get_current_user
- Uses JWT for token creation and validation
- Password hashing with bcrypt

### 5.5 Trade Router (trade.py)
- Function: trade
- Handles buy/sell logic, portfolio updates, and trade recording

### 5.6 WebSocket Router (websocket.py)
- Function: websocket_endpoint
- Manages WebSocket connections and broadcasts simulated price data

## 6. Data Validation Schemas (schemas.py)
- UserCreate, UserLogin, UserOut
- TradeBase, Trade
- Portfolio

## 7. Error Handling
- HTTP 400 for invalid trades or insufficient holdings
- HTTP 401 for authentication failures
- WebSocket exceptions logged and connections closed gracefully

## 8. Security Considerations
- Passwords hashed with bcrypt
- JWT tokens with expiration
- Protected routes require valid tokens

## 9. Deployment Details
- Docker Compose for multi-container setup
- Environment variables for secrets and DB config
- Nginx as reverse proxy and static file server

## 10. Testing Considerations
- Unit tests for API endpoints
- Integration tests for trade and portfolio flows
- WebSocket connection and message tests

## 11. Future Enhancements
- Add detailed API documentation with OpenAPI
- Implement rate limiting and throttling
- Add logging and monitoring for WebSocket connections

---

This LLD document provides the detailed design necessary for implementation and maintenance of the RealtimeAPI Paper Trading Platform.
