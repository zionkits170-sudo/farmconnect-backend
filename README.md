# FarmConnect Backend - KITUNZI ZION MUKISA M26B13/019

Original Repo: https://github.com/Musasizi/farmconnect-backend
My Fork: https://github.com/zionkits170-sudo/farmconnect-backend
Student: KITUNZI ZION MUKISA - M26B13/019
GitHub: zionkits170-sudo

## Prerequisites
- Node.js LTS v20+ and npm
- MySQL or MariaDB
- Git

## Setup for Lecturer

1. Clone:
   git clone https://github.com/zionkits170-sudo/farmconnect-backend.git
   cd farmconnect-backend

2. Install:
   npm install

3. Env:
   cp .env.example .env
   Edit .env:
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=root123 (your mysql password)
   DB_NAME=farmconnect
   JWT_SECRET=zion_secret_2024_mukisa
   ALLOWED_ORIGINS=http://localhost:5173

4. Create Database:
   CREATE DATABASE farmconnect;

5. Load Original Schema & Seed:
   mysql -u root -p farmconnect < database/schema.sql
   mysql -u root -p farmconnect < database/seed.sql
   (Check README original for exact path - may be in sql/ folder)

6. Load NEW Migrations for My 3 Features:
   mysql -u root -p farmconnect < database/migrations/003_favorites.sql
   mysql -u root -p farmconnect < database/migrations/004_reviews.sql
   mysql -u root -p farmconnect < database/migrations/005_saved_searches.sql

7. Run:
   npm run dev
   Backend at http://localhost:5000/api

## New Endpoints Added (M26B13/019)

### Feature 1: Database-backed Favourites
- GET /api/favorites (auth) - List my favourites
- POST /api/favorites (auth) {product_id}
- DELETE /api/favorites/:productId (auth)

### Feature 2: Ratings & Reviews
- GET /api/reviews/product/:id - Returns {reviews[], stats: {avgRating, count}}
- POST /api/reviews/product/:id (auth) {rating 1-5, comment}

### Feature 3: Advanced Search
- GET /api/products?search=maize&category=seeds&minPrice=10000&maxPrice=50000

## Database Tables Added

1. favorites (id, user_id, product_id, created_at) UNIQUE(user_id, product_id)
2. reviews (id, product_id, user_id, rating CHECK 1-5, comment, UNIQUE(product_id, user_id))
3. saved_searches (id, user_id, search_query, category, min_price, max_price)

## Auth
Uses JWT Bearer token. Middleware src/middleware/auth.js

## Testing
See report REPORT_M26B13_019_KITUNZI_ZION_FINAL.pdf

## Acknowledgement
Original by Musasizi (UCU), new features by KITUNZI ZION MUKISA M26B13/019
