import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-6 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
            <div className="container flex justify-between items-center">
                <a href="#home" className="flex items-center transform translate-y-1">
                    <img
                        src={logoImg}
                        alt="Dematric Architects"
                        className="w-auto invert brightness-[5] contrast-[2] mix-blend-screen"
                        style={{ height: '42px', objectFit: 'contain' }}
                    />
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-8 items-center">
                    <a href="#home" className="hover:text-accent font-medium">Home</a>
                    <a href="#about" className="hover:text-accent font-medium">About</a>
                    <a href="#services" className="hover:text-accent font-medium">Services</a>
                    <a href="#portfolio" className="hover:text-accent font-medium">Portfolio</a>
                    <a href="#contact" className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-accent hover:text-white transition-all">Start Project</a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-0 left-0 w-full h-screen glass flex flex-col items-center justify-center gap-8 md:hidden">
                    <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl">Home</a>
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl">About</a>
                    <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl">Services</a>
                    <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl">Portfolio</a>
                    <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="px-8 py-3 bg-white text-black rounded-full font-bold">Start Project</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
