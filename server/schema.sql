-- Database Schema for Dematric Architects Website

-- Hero Section
CREATE TABLE IF NOT EXISTS hero (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(255) NOT NULL,
    main_title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- About Section
CREATE TABLE IF NOT EXISTS about (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    description_2 TEXT,
    years_of_experience INTEGER,
    projects_completed INTEGER,
    design_awards INTEGER,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects/Portfolio
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Information
CREATE TABLE IF NOT EXISTS contact_info (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subtitle TEXT,
    email VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    project_type VARCHAR(100),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default data

-- Hero content
INSERT INTO hero (company_name, main_title, subtitle, description) VALUES
('Dematric Architects', 'Real Reflection', 'Of Thought.', 'We don''t just design buildings; we architect visions and manifest thoughts into enduring structures.')
ON CONFLICT DO NOTHING;

-- About content
INSERT INTO about (title, description, description_2, years_of_experience, projects_completed, design_awards, image_url) VALUES
('Manifesting Thought into Enduring Architecture', 
 'At Dematric Architects, we believe that every structure should be a "Real Reflection of Thought." Our approach combines intellectual depth with architectural precision to create spaces that resonate with their purpose and surroundings.',
 'With a focus on innovation and sustainable development, our studio bridges the gap between conceptual imagination and physical reality.',
 15, 250, 12,
 'https://images.unsplash.com/photo-1487958444681-8b97e3d67cc2?q=80&w=2070&auto=format&fit=crop')
ON CONFLICT DO NOTHING;

-- Services
INSERT INTO services (icon, title, description, display_order) VALUES
('Home', 'Residential Design', 'Luxury homes tailored to your lifestyle, blending comfort with contemporary aesthetics.', 1),
('Building2', 'Commercial Spaces', 'Innovative office buildings and retail environments that drive business and inspire productivity.', 2),
('PencilRuler', 'Urban Planning', 'Designing sustainable urban ecosystems that prioritize community well-being and efficiency.', 3),
('Layout', 'Interior Architecture', 'Seamlessly integrating interior and exterior spaces for a holistic architectural experience.', 4)
ON CONFLICT DO NOTHING;

-- Projects
INSERT INTO projects (title, category, image_url, display_order) VALUES
('Eco-Luxe Villa', 'Residential', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', 1),
('Centennial Tower', 'Commercial', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 2),
('The Glass House', 'Interior', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', 3),
('Urban Nexus', 'Masterplan', 'https://images.unsplash.com/photo-1545459720-aac273a27022?q=80&w=2070&auto=format&fit=crop', 4)
ON CONFLICT DO NOTHING;

-- Contact info
INSERT INTO contact_info (title, subtitle, email, phone, address) VALUES
('Let''s Build Your Vision Together.', 
 'Whether you have a specific project in mind or just want to explore possibilities, we''re ready to listen.',
 'hello@dematric.com',
 '+1 (555) 123-4567',
 '123 Design District, NY')
ON CONFLICT DO NOTHING;
