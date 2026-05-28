# Pickup Slot Booking System

A full-stack pickup slot booking system built using **Next.js**, **Go (Gin)**, and **MySQL**.

The application supports:

* Customer slot booking
* Admin slot management
* Real-time slot availability updates
* Capacity management
* Duplicate booking prevention
* Persistent database storage
* Automatic slot seeding on startup

---

# Tech Stack

## Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Lucide Icons

## Backend

* Go
* Gin Framework

## Database

* MySQL

---

# Features

## Customer View

* Select date
* View available pickup slots
* Book pickup slots
* Real-time slot availability updates
* Capacity indicators
* Full slot detection
* Blocked slot handling
* Error handling with API messages

## Admin View

* View all slots
* Block/unblock slots
* Monitor slot usage
* Live updates reflected in customer view

## Backend Features

* Persistent MySQL database
* Duplicate booking prevention
* Capacity validation
* Automatic startup seeding
* REST API architecture

---

# Project Structure

```bash
pickup-slot-booking/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── types/
│   └── ...
│
├── backend/
│   ├── cmd/
│   │   └── api/
│   ├── internal/
│   │   ├── driver/
│   │   ├── models/
│   │   ├── repository/
│   │   ├── utils/
│   │   └── ...
│   └── ...
│
└── README.md
```

---

# Database Setup

Create a MySQL database:

```sql
CREATE DATABASE slot_booking;
```

---

# Slots Table

```sql
CREATE TABLE slots (
	id INT AUTO_INCREMENT PRIMARY KEY,
	label VARCHAR(255),
	date DATE,
	start_time TIME,
	end_time TIME,
	max_capacity INT,
	booked_count INT DEFAULT 0,
	blocked BOOLEAN DEFAULT FALSE
);
```

---

# Bookings Table

```sql
CREATE TABLE bookings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	slot_id INT,
	customer_name VARCHAR(255),
	customer_phone VARCHAR(20),
	address TEXT,

	CONSTRAINT bookings_ibfk_1
	FOREIGN KEY (slot_id)
	REFERENCES slots(id)
);
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
go mod tidy
```

Run the server:

```bash
go run ./cmd/api
```

The backend runs on:

```txt
http://localhost:8080
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# Environment Variables

## Frontend

Create:

```bash
frontend/.env.local
```

Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

## Backend

Create:

```bash
backend/.env
```

Add:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=slot_booking
DB_USER=root
DB_PASSWORD=yourpassword
```

---

# Automatic Slot Seeding

On backend startup, the application automatically creates slots for:

* Today
* Next 2 days

The following slots are seeded:

| Label        | Start | End   | Capacity |
| ------------ | ----- | ----- | -------- |
| 7 AM – 9 AM  | 07:00 | 09:00 | 8        |
| 9 AM – 11 AM | 09:00 | 11:00 | 10       |
| 11 AM – 1 PM | 11:00 | 13:00 | 10       |
| 2 PM – 4 PM  | 14:00 | 16:00 | 8        |
| 4 PM – 6 PM  | 16:00 | 18:00 | 6        |

Duplicate slots are automatically prevented.

---

# API Endpoints

## Get Slots

```http
GET /slots?date=YYYY-MM-DD
```

---

## Create Booking

```http
POST /bookings
```

Request Body:

```json
{
  "slotId": 1,
  "customerName": "John Doe",
  "customerPhone": "9876543210",
  "address": "123 Street Name"
}
```

---

## Get Bookings

```http
GET /bookings
```

---

## Block / Unblock Slot

```http
PATCH /slots/:id/block
```

---

# Validation Rules

* Duplicate bookings for the same slot are prevented
* Full slots cannot be booked
* Blocked slots cannot be booked
* Available capacity updates automatically

---

# Demo

The application includes:

* Customer booking flow
* Admin management flow
* Real-time slot updates
* Persistent data storage

---

# Author

Snehil Sundriyal
