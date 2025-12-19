import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchProjects } from '../api/client';

const Portfolio = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        loadProjects();
    }, []);

    return (
        <section id="portfolio" className="py-32">
            <div className="container flex justify-between items-end mb-16">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Works</h2>
                    <p className="text-text-muted">A showcase of our most ambitious projects.</p>
                </div>
                <button className="hidden md:block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                    View All Projects
                </button>
            </div>

            <div className="container grid md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden aspect-[4/3] rounded-2xl"
                    >
                        <img
                            src={project.image_url}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="inline-block px-4 py-1 bg-accent text-black text-sm font-bold mb-2 rounded-full w-fit">{project.category}</span>
                            <h3 className="text-2xl font-bold">{project.title}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Portfolio;
