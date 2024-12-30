/*
  # Initial Schema Setup for Tutor Platform

  1. Tables
    - profiles
      - Stores extended user information for all user types
      - Links to Supabase auth.users
    - tutors
      - Stores tutor-specific information
    - subjects
      - Available subjects for tutoring
    - tutor_subjects
      - Many-to-many relationship between tutors and subjects
    - requests
      - Tutoring requests from parents
    - matches
      - Successful matches between tutors and parents
    - reviews
      - Parent reviews for tutors

  2. Security
    - Enable RLS on all tables
    - Set up policies for different user roles
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'tutor', 'parent');

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role user_role NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  phone text,
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tutors table
CREATE TABLE tutors (
  id uuid PRIMARY KEY REFERENCES profiles(id),
  qualification text NOT NULL,
  experience integer NOT NULL,
  hourly_rate integer NOT NULL,
  bio text,
  availability jsonb,
  verified boolean DEFAULT false,
  rating decimal(3,2) DEFAULT 0,
  total_reviews integer DEFAULT 0
);

-- Create subjects table
CREATE TABLE subjects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL UNIQUE,
  category text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create tutor_subjects junction table
CREATE TABLE tutor_subjects (
  tutor_id uuid REFERENCES tutors(id),
  subject_id uuid REFERENCES subjects(id),
  PRIMARY KEY (tutor_id, subject_id)
);

-- Create requests table
CREATE TABLE requests (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id uuid REFERENCES profiles(id),
  subject_id uuid REFERENCES subjects(id),
  grade integer NOT NULL,
  budget_min integer NOT NULL,
  budget_max integer NOT NULL,
  description text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id uuid REFERENCES requests(id),
  tutor_id uuid REFERENCES tutors(id),
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_id uuid REFERENCES matches(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Tutors policies
CREATE POLICY "Public can view verified tutors"
  ON tutors FOR SELECT
  USING (verified = true);

CREATE POLICY "Tutors can update their own profile"
  ON tutors FOR UPDATE
  USING (auth.uid() = id);

-- Subjects policies
CREATE POLICY "Everyone can view subjects"
  ON subjects FOR SELECT
  TO authenticated
  USING (true);

-- Requests policies
CREATE POLICY "Parents can view their own requests"
  ON requests FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can create requests"
  ON requests FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

-- Matches policies
CREATE POLICY "Users can view their own matches"
  ON matches FOR SELECT
  USING (
    auth.uid() IN (
      SELECT parent_id FROM requests WHERE id = request_id
      UNION
      SELECT tutor_id
    )
  );

-- Reviews policies
CREATE POLICY "Public can view reviews"
  ON reviews FOR SELECT
  USING (true);

CREATE POLICY "Parents can create reviews for their matches"
  ON reviews FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT parent_id FROM requests r
      JOIN matches m ON m.request_id = r.id
      WHERE m.id = match_id
    )
  );

-- Create function to update tutor ratings
CREATE OR REPLACE FUNCTION update_tutor_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE tutors
  SET rating = (
    SELECT AVG(r.rating)
    FROM reviews r
    JOIN matches m ON m.id = r.match_id
    WHERE m.tutor_id = tutors.id
  ),
  total_reviews = (
    SELECT COUNT(*)
    FROM reviews r
    JOIN matches m ON m.id = r.match_id
    WHERE m.tutor_id = tutors.id
  )
  WHERE id = (
    SELECT tutor_id
    FROM matches
    WHERE id = NEW.match_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updating tutor ratings
CREATE TRIGGER update_tutor_rating_trigger
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_tutor_rating();