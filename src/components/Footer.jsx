import React from 'react';
import { Instagram, Linkedin, Twitter, Dribbble } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
    return (
        <footer className="py-20 border-t border-white/5 bg-black">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <img src={logoImg} alt="Dematric Architects" className="w-auto invert brightness-[5] contrast-[2] mix-blend-screen mb-8" style={{ height: '50px', objectFit: 'contain' }} />
                        <p className="text-text-muted max-w-sm mb-8">
                            Manifesting Thought into Enduring Architecture. We specialize in precision, innovation, and sustainable urban solutions.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all"><Instagram size={18} /></a>
                            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all"><Dribbble size={18} /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Links</h4>
                        <ul className="space-y-4 text-text-muted">
                            <li><a href="#home" className="hover:text-white">Home</a></li>
                            <li><a href="#about" className="hover:text-white">About Us</a></li>
                            <li><a href="#services" className="hover:text-white">Services</a></li>
                            <li><a href="#portfolio" className="hover:text-white">Portfolio</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-accent">Newsletter</h4>
                        <p className="text-sm text-text-muted mb-4">Stay updated with our latest designs and news.</p>
                        <div className="relative">
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 outline-none focus:border-accent" placeholder="Enter your email" />
                            <button className="absolute right-1 top-1 bottom-1 px-4 bg-white text-black text-xs font-bold rounded-full hover:bg-accent hover:text-white transition-all">Join</button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center text-sm text-text-muted">
                    <p>© 2024 Dematric Architects. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
