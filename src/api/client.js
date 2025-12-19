const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const fetchHero = async () => {
    const response = await fetch(`${API_BASE_URL}/hero`);
    return response.json();
};

export const fetchAbout = async () => {
    const response = await fetch(`${API_BASE_URL}/about`);
    return response.json();
};

export const fetchServices = async () => {
    const response = await fetch(`${API_BASE_URL}/services`);
    return response.json();
};

export const fetchProjects = async () => {
    const response = await fetch(`${API_BASE_URL}/projects`);
    return response.json();
};

export const fetchContactInfo = async () => {
    const response = await fetch(`${API_BASE_URL}/contact`);
    return response.json();
};

export const fetchGallery = async () => {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    return response.json();
};

export const submitContactForm = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};
