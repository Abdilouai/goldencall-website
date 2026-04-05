-- Neon DB Schema for Golden Call Payment Submissions
-- Run this SQL in your Neon DB dashboard (SQL Editor)

CREATE TABLE IF NOT EXISTS payment_submissions (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('d17', 'bank')),
    plan_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    receipt_filename TEXT,
    receipt_data TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster queries on status
CREATE INDEX IF NOT EXISTS idx_payment_submissions_status ON payment_submissions(status);

-- Index for searching by date
CREATE INDEX IF NOT EXISTS idx_payment_submissions_created ON payment_submissions(created_at DESC);

-- Table for personalized offers
CREATE TABLE IF NOT EXISTS personalized_offers (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    email TEXT NOT NULL,
    objective TEXT NOT NULL,
    hours_per_week TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for personalized_offers
CREATE INDEX IF NOT EXISTS idx_personalized_offers_created ON personalized_offers(created_at DESC);

-- Table for free sessions
CREATE TABLE IF NOT EXISTS free_sessions (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    contact_method TEXT NOT NULL,
    interest_reason TEXT NOT NULL,
    study_method TEXT NOT NULL,
    session_date TEXT NOT NULL,
    session_time TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for free_sessions
CREATE INDEX IF NOT EXISTS idx_free_sessions_date ON free_sessions(session_date);

-- Table for Teachers
CREATE TABLE IF NOT EXISTS teachers (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: In production you need to run this ALTER TABLE once.
-- ALTER TABLE free_sessions ADD COLUMN IF NOT EXISTS teacher_id INTEGER REFERENCES teachers(id);

-- Pre-hashed password for 'password123' using bcrypt
-- INSERT INTO teachers (name, email, password_hash) VALUES 
-- ('Teacher One', 'teacher1@goldencall.com', '$2a$10$9K2t5q33Q5B.SgJ3c8/z3e2e5sU3A1xV3e5m1t3aV5dM9bL5xXzRy'),
-- ('Teacher Two', 'teacher2@goldencall.com', '$2a$10$9K2t5q33Q5B.SgJ3c8/z3e2e5sU3A1xV3e5m1t3aV5dM9bL5xXzRy');
