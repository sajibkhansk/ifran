-- Add gallery table for About section carousel
CREATE TABLE IF NOT EXISTS about_gallery (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample gallery images
INSERT INTO about_gallery (image_url, alt_text, display_order) VALUES
('https://images.unsplash.com/photo-1487958444681-8b97e3d67cc2?q=80&w=2070&auto=format&fit=crop', 'Modern Architecture Studio', 1),
('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop', 'Contemporary Interior Design', 2),
('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop', 'Luxury Residential Project', 3),
('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', 'Commercial Building Design', 4),
('https://images.unsplash.com/photo-1545459720-aac273a27022?q=80&w=2070&auto=format&fit=crop', 'Urban Planning Project', 5)
ON CONFLICT DO NOTHING;
