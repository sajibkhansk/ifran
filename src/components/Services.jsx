import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Layout, PencilRuler } from 'lucide-react';
import { fetchServices } from '../api/client';

const iconMap = {
    'Home': Home,
    'Building2': Building2,
    'PencilRuler': PencilRuler,
    'Layout': Layout
};

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            try {
                const data = await fetchServices();
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
        loadServices();
    }, []);

    return (
        <section id="services" className="bg-[#0f0f0f] py-32">
            <div className="container text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
                <div className="w-16 h-1 bg-accent mx-auto"></div>
            </div>

            <div className="container grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => {
                    const IconComponent = iconMap[service.icon] || Home;
                    return (
                        <motion.div
                            key={service.id}
                            whileHover={{ y: -10 }}
                            className="p-8 glass rounded-xl hover:border-accent group transition-all"
                        >
                            <div className="text-accent mb-6 group-hover:scale-110 transition-transform">
                                <IconComponent size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                            <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Services;
