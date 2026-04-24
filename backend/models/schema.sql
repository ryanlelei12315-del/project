-- Database Schema for MultiverseCare

CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER,
    service TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data for services
INSERT INTO services (title, description)
SELECT 'Cardiology', 'Advanced cardiac diagnostics, interventional procedures, and heart failure management.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Cardiology');

INSERT INTO services (title, description)
SELECT 'Neurology', 'Expert evaluation and treatment for neurological disorders including stroke and epilepsy.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Neurology');

INSERT INTO services (title, description)
SELECT 'Orthopedics', 'Joint replacement, sports medicine, spinal surgery, and rehabilitation.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Orthopedics');

INSERT INTO services (title, description)
SELECT 'Pediatrics', 'Compassionate child healthcare from newborn care through adolescence.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Pediatrics');

INSERT INTO services (title, description)
SELECT 'Dermatology', 'Medical and cosmetic dermatology services including skin cancer screening and aesthetic procedures.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Dermatology');

INSERT INTO services (title, description)
SELECT 'Oncology', 'Multidisciplinary cancer care with precision medicine and personalised treatment protocols.'
WHERE NOT EXISTS (SELECT 1 FROM services WHERE title = 'Oncology');

-- Seed initial data for testimonials
INSERT INTO testimonials (name, message, rating)
SELECT 'James Mitchell', 'The cardiac team at MultiverseCare saved my life. I am forever grateful.', 5
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'James Mitchell');

INSERT INTO testimonials (name, message, rating)
SELECT 'Sarah Fernandez', 'My son''s complex condition was handled with such expertise and compassion.', 5
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Sarah Fernandez');

INSERT INTO testimonials (name, message, rating)
SELECT 'Robert Kamau', 'After years of knee pain, the orthopedic team gave me my mobility back. Recovery was faster than expected.', 5
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Robert Kamau');

INSERT INTO testimonials (name, message, rating)
SELECT 'Amina Njeri', 'The oncology department provided not just treatment, but hope. Their support made all the difference.', 5
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE name = 'Amina Njeri');

