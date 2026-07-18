# ShopMate - Full Stack E-Commerce Platform

ShopMate is a full-stack e-commerce application built with React, Express.js, PostgreSQL, Stripe, Cloudinary, and Google Gemini. The project has three parts: a customer storefront, an admin dashboard, and a backend API.

The main goal of this project is to cover a realistic e-commerce flow: users can browse and filter products, manage cart items, place orders, complete payment, review purchased products, and use AI-assisted product search. Admin users can manage products, users, orders, and dashboard statistics.

## Tech Stack

**Frontend**
- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Stripe Elements

**Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT authentication
- HTTP-only cookies
- Stripe
- Cloudinary
- Nodemailer
- Google Gemini API

## Project Structure

```txt
shopmate_ecommerce/
|-- client/       # Customer-facing React app
|-- admin/        # Admin dashboard
|-- server/       # Express API and PostgreSQL logic
`-- README.md
```

## Main Features

- User registration, login, logout, profile update, and password reset
- JWT-based authentication using HTTP-only cookies
- Role-based admin authorization
- Product listing with search, category, price, rating, availability, and pagination filters
- Product details with reviews
- Admin product create, update, and delete
- Cloudinary image upload for product and profile images
- Cart and order placement flow
- Stripe payment intent creation and card payment confirmation
- Stripe webhook handling for successful payments
- Order history for users
- Admin order management
- Product reviews only for users who purchased the product
- AI-assisted product search using Gemini
- Admin dashboard statistics and charts

## Backend Flow Example

Product listing follows this flow:

```txt
React Products page
-> Redux async thunk
-> Axios GET /api/v1/product
-> Express product route
-> productController.fetchAllProducts
-> PostgreSQL query with filters and pagination
-> JSON response
-> Redux state update
-> Product cards render on UI
```

This same route-controller-database-response pattern is used across most APIs in the project.

## Setup Instructions

### 1. Clone the repository

```bash
git clone <repository-url>
cd shopmate_ecommerce
```

### 2. Install dependencies

Install backend dependencies:

```bash
cd server
npm install
```

Install customer frontend dependencies:

```bash
cd ../client
npm install
```

Install admin dashboard dependencies:

```bash
cd ../admin
npm install
```

### 3. Configure environment variables

Create this file:

```txt
server/config/config.env
```

Example variables:

```env
PORT=4000

FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

DB_USER=postgres
DB_HOST=localhost
DB_NAME=shopmate
DB_PASSWORD=your_database_password

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES_IN=7d
COOKIE_EXPIRES_IN=7

CLOUDINARY_CLIENT_NAME=your_cloudinary_cloud_name
CLOUDINARY_CLIENT_API=your_cloudinary_api_key
CLOUDINARY_CLIENT_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SERVICE=your_smtp_service
SMTP_MAIL=your_email
SMTP_PASSWORD=your_email_password

GEMINI_API_KEY=your_gemini_api_key
```

The backend creates required tables on startup through `server/utils/createTables.js`.

### 4. Start the backend

```bash
cd server
npm start
```

Backend runs on:

```txt
http://localhost:4000
```

### 5. Start the customer app

```bash
cd client
npm run dev
```

### 6. Start the admin dashboard

```bash
cd admin
npm run dev
```

## API Reference

Base URL:

```txt
http://localhost:4000/api/v1
```

Routes marked as **Protected** require a valid login cookie. Routes marked as **Admin** require an authenticated user with `role = Admin`.

### Auth APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user |
| POST | `/auth/login` | Public | Login user and set JWT cookie |
| GET | `/auth/me` | Protected | Get currently logged-in user |
| GET | `/auth/logout` | Protected | Logout user and clear cookie |
| POST | `/auth/password/forgot` | Public | Send password reset email |
| PUT | `/auth/password/reset/:token` | Public | Reset password using token |
| PUT | `/auth/password/update` | Protected | Update logged-in user's password |
| PUT | `/auth/profile/update` | Protected | Update user profile and avatar |

### Product APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/product` | Public | Fetch products with filters and pagination |
| GET | `/product/singleProduct/:productId` | Public | Fetch single product with reviews |
| POST | `/product/admin/create` | Admin | Create a product |
| PUT | `/product/admin/update/:productId` | Admin | Update product details |
| DELETE | `/product/admin/delete/:productId` | Admin | Delete product |
| PUT | `/product/post-new/review/:productId` | Protected | Create or update product review |
| DELETE | `/product/delete/review/:productId` | Protected | Delete user's product review |
| POST | `/product/ai-search` | Protected | Search products using AI-assisted filtering |

Product listing supports these query parameters:

| Query | Example | Purpose |
|---|---|---|
| `category` | `Electronics` | Filter by category |
| `price` | `0-10000` | Filter by price range |
| `search` | `laptop` | Search by name or description |
| `ratings` | `4` | Minimum rating |
| `availability` | `in-stock` | Filter by stock status |
| `page` | `1` | Pagination page |

Example:

```txt
GET /api/v1/product?category=Electronics&price=0-10000&search=laptop&page=1
```

### Order APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/order/new` | Protected | Place a new order and create Stripe payment intent |
| GET | `/order/orders/me` | Protected | Fetch logged-in user's paid orders |
| GET | `/order/:orderId` | Protected | Fetch single order details |
| GET | `/order/admin/getall` | Admin | Fetch all paid orders |
| PUT | `/order/admin/update/:orderId` | Admin | Update order status |
| DELETE | `/order/admin/delete/:orderId` | Admin | Delete order |

### Admin APIs

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/admin/getallusers` | Admin | Fetch all users |
| DELETE | `/admin/deleteuser/:id` | Admin | Delete user |
| GET | `/admin/fetch/dashboard-stats` | Admin | Fetch dashboard statistics |

### Payment Webhook

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/payment/webhook` | Stripe | Handles Stripe payment success event |

When Stripe sends `payment_intent.succeeded`, the backend:

- verifies the webhook signature
- updates payment status to `Paid`
- updates order `paid_at`
- reduces product stock based on ordered items

## Database Tables

The backend creates these PostgreSQL tables:

| Table | Purpose |
|---|---|
| `users` | User accounts, roles, avatar, and password reset fields |
| `products` | Product catalog, stock, images, ratings, and creator |
| `reviews` | Product reviews linked to users and products |
| `orders` | Order-level data such as buyer, total, status, and payment date |
| `order_items` | Products inside each order |
| `payments` | Payment status and Stripe payment reference |
| `shipping_info` | Shipping address connected to an order |

The schema uses UUID primary keys, foreign keys, `CHECK` constraints, and `UNIQUE` constraints where needed.

## Authentication and Authorization

Authentication is handled with JWT:

1. User logs in or registers.
2. Backend signs a JWT containing the user id.
3. Token is stored in an HTTP-only cookie.
4. Protected routes use `isAuthenticated`.
5. Admin routes also use `authorizedRoles("Admin")`.

Relevant files:

```txt
server/controllers/authController.js
server/middlewares/authMiddleware.js
server/utils/jwtToken.js
```

## Payment Flow

```txt
User places order
-> Backend validates cart and stock
-> Backend creates order, order items, and shipping info
-> Backend creates Stripe payment intent
-> Frontend confirms card payment using Stripe Elements
-> Stripe sends webhook to backend
-> Backend marks payment as Paid and reduces stock
```

Relevant files:

```txt
server/controllers/orderController.js
server/utils/generatePaymentIntent.js
server/app.js
client/src/components/PaymentForm.jsx
```

## Things I Would Improve

Some areas I would improve before treating this as a production-ready system:

- Add request validation with Zod or Joi
- Add database transactions for order creation
- Add API tests for auth, products, orders, and payments
- Avoid returning password hashes in user responses
- Add secure cookie options for production
- Add rate limiting for auth and AI routes
- Add database indexes for common product filters
- Add Swagger/OpenAPI documentation
- Replace table auto-creation with proper migrations
- Improve logging and deployment monitoring

## Current Status

This project is mainly built as a learning project to understand full-stack e-commerce development with a stronger focus on backend API design, authentication, PostgreSQL relationships, and payment flow.
