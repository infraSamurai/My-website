-- School Website Database Schema
-- PostgreSQL Database Design

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (for admin, teachers, parents)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'teacher', 'parent', 'student')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admission_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    blood_group VARCHAR(5),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    emergency_contact VARCHAR(20),
    medical_conditions TEXT,
    allergies TEXT,
    profile_image_url VARCHAR(500),
    enrollment_date DATE NOT NULL,
    current_grade VARCHAR(20) NOT NULL,
    section VARCHAR(10),
    roll_number INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parents table
CREATE TABLE parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    relationship VARCHAR(20) NOT NULL CHECK (relationship IN ('father', 'mother', 'guardian')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    occupation VARCHAR(100),
    annual_income DECIMAL(12,2),
    address TEXT,
    is_primary_contact BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admissions table
CREATE TABLE admissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_number VARCHAR(20) UNIQUE NOT NULL,
    student_id UUID REFERENCES students(id),
    grade_applying_for VARCHAR(20) NOT NULL,
    previous_school VARCHAR(200),
    previous_grade VARCHAR(20),
    application_status VARCHAR(50) DEFAULT 'pending' CHECK (application_status IN ('pending', 'document_verification', 'assessment_scheduled', 'assessment_completed', 'interview_scheduled', 'interview_completed', 'approved', 'rejected', 'enrolled')),
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assessment_date TIMESTAMP,
    interview_date TIMESTAMP,
    assessment_score INTEGER,
    interview_notes TEXT,
    admission_fee DECIMAL(10,2),
    tuition_fee DECIMAL(10,2),
    total_fee DECIMAL(10,2),
    fee_paid BOOLEAN DEFAULT false,
    payment_date TIMESTAMP,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Required documents table
CREATE TABLE admission_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admission_id UUID REFERENCES admissions(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_name VARCHAR(200) NOT NULL,
    file_url VARCHAR(500),
    file_size INTEGER,
    mime_type VARCHAR(100),
    is_verified BOOLEAN DEFAULT false,
    verification_notes TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id)
);

-- Grades/Classes table
CREATE TABLE grades (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade_name VARCHAR(20) UNIQUE NOT NULL,
    grade_level INTEGER NOT NULL,
    min_age_years INTEGER NOT NULL,
    max_age_years INTEGER NOT NULL,
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    annual_fee DECIMAL(10,2) NOT NULL,
    admission_fee DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teachers table
CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    qualification VARCHAR(200) NOT NULL,
    experience_years INTEGER,
    subjects_taught TEXT[],
    joining_date DATE NOT NULL,
    salary DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Class assignments table
CREATE TABLE class_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade_id UUID REFERENCES grades(id),
    section VARCHAR(10) NOT NULL,
    teacher_id UUID REFERENCES teachers(id),
    academic_year VARCHAR(10) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(grade_id, section, academic_year)
);

-- Student enrollments table
CREATE TABLE student_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    grade_id UUID REFERENCES grades(id),
    section VARCHAR(10),
    academic_year VARCHAR(10) NOT NULL,
    enrollment_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee structure table
CREATE TABLE fee_structure (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grade_id UUID REFERENCES grades(id),
    fee_type VARCHAR(50) NOT NULL CHECK (fee_type IN ('admission', 'tuition', 'transport', 'library', 'laboratory', 'sports', 'other')),
    amount DECIMAL(10,2) NOT NULL,
    frequency VARCHAR(20) NOT NULL CHECK (frequency IN ('one_time', 'monthly', 'quarterly', 'annually')),
    academic_year VARCHAR(10) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Fee payments table
CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    fee_structure_id UUID REFERENCES fee_structure(id),
    amount_paid DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100),
    receipt_number VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    due_date DATE,
    late_fee DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Content management tables
CREATE TABLE pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    content TEXT,
    meta_description VARCHAR(500),
    meta_keywords VARCHAR(500),
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url VARCHAR(500),
    author_id UUID REFERENCES users(id),
    category VARCHAR(100),
    tags TEXT[],
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    venue VARCHAR(200),
    event_type VARCHAR(50) CHECK (event_type IN ('academic', 'cultural', 'sports', 'celebration', 'other')),
    is_featured BOOLEAN DEFAULT false,
    image_url VARCHAR(500),
    registration_required BOOLEAN DEFAULT false,
    max_participants INTEGER,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    category VARCHAR(100),
    tags TEXT[],
    uploaded_by UUID REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    subject VARCHAR(200),
    message TEXT NOT NULL,
    grade_interest VARCHAR(20),
    submission_type VARCHAR(50) DEFAULT 'general' CHECK (submission_type IN ('general', 'admission', 'feedback', 'complaint')),
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
    assigned_to UUID REFERENCES users(id),
    response TEXT,
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings table
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type VARCHAR(20) DEFAULT 'string' CHECK (setting_type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) CHECK (notification_type IN ('admission', 'payment', 'academic', 'event', 'general')),
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_students_admission_number ON students(admission_number);
CREATE INDEX idx_students_current_grade ON students(current_grade);
CREATE INDEX idx_admissions_application_number ON admissions(application_number);
CREATE INDEX idx_admissions_status ON admissions(application_status);
CREATE INDEX idx_admissions_date ON admissions(application_date);
CREATE INDEX idx_parents_student_id ON parents(student_id);
CREATE INDEX idx_fee_payments_student_id ON fee_payments(student_id);
CREATE INDEX idx_fee_payments_status ON fee_payments(payment_status);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- Insert default data
INSERT INTO grades (grade_name, grade_level, min_age_years, max_age_years, total_seats, available_seats, annual_fee, admission_fee) VALUES
('Nursery', 1, 2, 3, 40, 40, 25000.00, 5000.00),
('KG', 2, 3, 4, 35, 35, 28000.00, 5000.00),
('Grade 1', 3, 5, 6, 30, 30, 32000.00, 5000.00),
('Grade 2', 4, 6, 7, 30, 30, 32000.00, 5000.00),
('Grade 3', 5, 7, 8, 30, 30, 32000.00, 5000.00),
('Grade 4', 6, 8, 9, 30, 30, 32000.00, 5000.00),
('Grade 5', 7, 9, 10, 30, 30, 32000.00, 5000.00),
('Grade 6', 8, 10, 11, 25, 25, 35000.00, 5000.00),
('Grade 7', 9, 11, 12, 25, 25, 35000.00, 5000.00),
('Grade 8', 10, 12, 13, 25, 25, 35000.00, 5000.00),
('Grade 9', 11, 13, 14, 20, 20, 38000.00, 5000.00),
('Grade 10', 12, 14, 15, 20, 20, 38000.00, 5000.00);

-- Insert default settings
INSERT INTO settings (setting_key, setting_value, setting_type, description, is_public) VALUES
('school_name', 'Vidya Mandir School', 'string', 'School name', true),
('school_address', '123 Education Street, Varanasi, UP 221001', 'string', 'School address', true),
('school_phone', '+91 542 2345678', 'string', 'School phone number', true),
('school_email', 'info@vidyamandir.edu', 'string', 'School email', true),
('admission_open', 'true', 'boolean', 'Whether admissions are currently open', true),
('academic_year', '2024-25', 'string', 'Current academic year', true),
('max_file_size', '5242880', 'number', 'Maximum file upload size in bytes', false),
('allowed_file_types', '["jpg", "jpeg", "png", "pdf", "doc", "docx"]', 'json', 'Allowed file types for uploads', false);

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON parents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON admissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admission_documents_updated_at BEFORE UPDATE ON admission_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_class_assignments_updated_at BEFORE UPDATE ON class_assignments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_student_enrollments_updated_at BEFORE UPDATE ON student_enrollments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fee_structure_updated_at BEFORE UPDATE ON fee_structure FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON fee_payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 