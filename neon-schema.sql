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
