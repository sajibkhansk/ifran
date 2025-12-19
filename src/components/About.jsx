import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchAbout, fetchGallery } from '../api/client';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [galleryImages, setGalleryImages] = useState([]);

    const [aboutData, setAboutData] = useState({
        title: 'Manifesting Thought into Enduring Architecture',
        description: 'At Dematric Architects, we believe that every structure should be a "Real Reflection of Thought." Our approach combines intellectual depth with architectural precision to create spaces that resonate with their purpose and surroundings.',
        description_2: 'With a focus on innovation and sustainable development, our studio bridges the gap between conceptual imagination and physical reality.',
        years_of_experience: 15,
        projects_completed: 250,
        design_awards: 12
    });

    useEffect(() => {
        const loadAboutData = async () => {
            try {
                const data = await fetchAbout();
                if (data && Object.keys(data).length > 0) {
                    setAboutData(data);
                }
            } catch (error) {
                console.error('Error fetching about data:', error);
            }
        };

        const loadGallery = async () => {
            try {
                const images = await fetchGallery();
                if (images && images.length > 0) {
                    setGalleryImages(images);
                }
            } catch (error) {
                console.error('Error fetching gallery:', error);
            }
        };

        loadAboutData();
        loadGallery();
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        if (galleryImages.length === 0) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [galleryImages.length]);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <section id="about" ref={ref} className="bg-white text-black py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Left side - Image Carousel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-neutral-200 overflow-visible rounded-2xl relative mb-6">
                            <AnimatePresence mode="wait">
                                {galleryImages.length > 0 && (
                                    <motion.img
                                        key={currentImageIndex}
                                        src={galleryImages[currentImageIndex].image_url}
                                        alt={galleryImages[currentImageIndex].alt_text || 'Gallery Image'}
                                        className="w-full h-full object-cover rounded-2xl"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Carousel Controls - Smaller */}
                            {galleryImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <ChevronLeft size={16} className="text-white" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all"
                                    >
                                        <ChevronRight size={16} className="text-white" />
                                    </button>
                                </>
                            )}


                            {/* Stats Badge - Positioned outside bottom-right */}
                            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-accent flex items-center justify-center p-6 text-black">
                                <span className="text-3xl font-bold">{aboutData.years_of_experience}+</span>
                                <span className="text-xs uppercase ml-2 leading-tight">Years of <br />Excellence</span>
                            </div>
                        </div>

                        {/* Dots Indicator - Outside below the image */}
                        {galleryImages.length > 1 && (
                            <div className="flex gap-2 justify-center">
                                {galleryImages.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`h-1 rounded-full transition-all ${index === currentImageIndex
                                            ? 'bg-black w-8'
                                            : 'bg-neutral-300 w-1 hover:bg-neutral-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Right side - Content (unchanged) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {aboutData.title}
                        </h2>
                        <p className="text-lg text-neutral-600 mb-6 font-light">
                            {aboutData.description}
                        </p>
                        <p className="text-lg text-neutral-600 mb-8 font-light">
                            {aboutData.description_2}
                        </p>

                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-neutral-200">
                            <div>
                                <h4 className="font-bold text-2xl mb-1">{aboutData.projects_completed}+</h4>
                                <p className="text-sm text-neutral-500 uppercase tracking-widest">Projects Completed</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-2xl mb-1">{aboutData.design_awards}</h4>
                                <p className="text-sm text-neutral-500 uppercase tracking-widest">Design Awards</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
