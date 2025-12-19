import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import heroImg from '../assets/Hero.jpeg';
import { fetchHero } from '../api/client';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        company_name: 'Dematric Architects',
        main_title: 'Real Reflection',
        subtitle: 'Of Thought.',
        description: 'We don\'t just design buildings; we architect visions and manifest thoughts into enduring structures.'
    });

    useEffect(() => {
        const loadHeroData = async () => {
            try {
                const data = await fetchHero();
                if (data && Object.keys(data).length > 0) {
                    setHeroData(data);
                }
            } catch (error) {
                console.error('Error fetching hero data:', error);
            }
        };
        loadHeroData();
    }, []);

    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
            <div className="absolute inset-0 z-0">
                <img
                    src={heroImg}
                    alt="Modern Architecture"
                    className="w-full h-full object-cover brightness-50"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="max-w-2xl"
                >
                    <span className="text-accent font-semibold tracking-widest uppercase mb-4 block">{heroData.company_name}</span>
                    <h1 className="text-6xl md:text-8xl font-bold leading-none mb-6">
                        {heroData.main_title} <br />
                        <span className="text-outline">{heroData.subtitle}</span>
                    </h1>
                    <p className="text-xl text-text-muted mb-8 max-w-lg">
                        {heroData.description}
                    </p>
                    <div className="flex gap-4">
                        <button className="px-8 py-4 bg-accent text-black font-bold rounded-sm hover:translate-y-[-4px] hover:brightness-110 transition-all shadow-lg">
                            Our Vision
                        </button>
                        <button className="px-8 py-4 border-2 border-white/30 glass font-bold rounded-sm hover:bg-white hover:text-black transition-all">
                            Projects
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
