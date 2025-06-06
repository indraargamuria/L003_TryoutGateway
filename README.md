# Simple Try Out Package Order with Payment Gateway

This project is a minimal implementation of a try-out package ordering system integrated with a payment gateway using **Midtrans**. Built using **Next.js**, **Supabase**, and **Tailwind CSS**, it allows users to select packages and proceed to payment seamlessly.

---

## 🔧 Tech Stack

- **Frontend**: Next.js App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment Gateway**: Midtrans Snap
- **Styling**: Tailwind CSS

---

## 🧩 Features

- Browse available try-out packages
- Order packages and initiate payment with Midtrans Snap
- Store order data with user ID and status
- Handle payment callbacks (optional enhancement)

---

## 🧪 Database Schema (Supabase)

### `packages` table

| Column      | Type     | Description             |
|-------------|----------|-------------------------|
| id          | UUID     | Primary Key             |
| name        | Text     | Package title           |
| description | Text     | Short description       |
| price       | Integer  | Price in IDR            |
| created_at  | Timestamp| Auto-filled             |

### `orders` table

| Column      | Type     | Description                 |
|-------------|----------|-----------------------------|
| id          | UUID     | Primary Key                 |
| user_id     | UUID     | Supabase auth user ID       |
| package_id  | UUID     | Foreign key to `packages`   |
| status      | Text     | Default: `pending`          |
| created_at  | Timestamp| Auto-filled                 |

> ⚠️ Make sure RLS (Row-Level Security) is disabled or properly configured for `orders` table.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/L003_TryoutGateway.git
cd L003_TryoutGateway
