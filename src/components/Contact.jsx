import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { fetchContactInfo, submitContactForm } from '../api/client';

const Contact = () => {
    const [contactInfo, setContactInfo] = useState({
        title: 'Let\'s Build Your Vision Together.',
        subtitle: 'Whether you have a specific project in mind or just want to explore possibilities, we\'re ready to listen.',
        email: 'hello@dematric.com',
        phone: '+1 (555) 123-4567',
        address: '123 Design District, NY'
    });

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        project_type: 'Residential',
        message: ''
    });

    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        const loadContactInfo = async () => {
            try {
                const data = await fetchContactInfo();
                if (data && Object.keys(data).length > 0) {
                    setContactInfo(data);
                }
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };
        loadContactInfo();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitStatus('sending');
            await submitContactForm(formData);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', project_type: 'Residential', message: '' });
            setTimeout(() => setSubmitStatus(''), 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(''), 3000);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="bg-[#111] py-32 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 transform translate-x-1/2"></div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-8">
                            {contactInfo.title.split('Vision Together.')[0]}
                            <br />
                            <span className="text-accent">Vision Together.</span>
                        </h2>
                        <p className="text-text-muted mb-12 max-w-md">
                            {contactInfo.subtitle}
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10">
                                    <Mail className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-widest">Email Us</p>
                                    <p className="text-lg font-medium">{contactInfo.email}</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10">
                                    <Phone className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-widest">Call Us</p>
                                    <p className="text-lg font-medium">{contactInfo.phone}</p>
                                </div>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-lg border border-white/10">
                                    <MapPin className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted uppercase tracking-widest">Studio Location</p>
                                    <p className="text-lg font-medium">{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-3xl border-white/5">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 opacity-50">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-accent transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 opacity-50">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-accent transition-all"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-50">Project Type</label>
                                <select
                                    name="project_type"
                                    value={formData.project_type}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-accent appearance-none"
                                >
                                    <option className="bg-black">Residential</option>
                                    <option className="bg-black">Commercial</option>
                                    <option className="bg-black">Interior</option>
                                    <option className="bg-black">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 opacity-50">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-accent transition-all h-32"
                                    placeholder="Tell us about your project..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitStatus === 'sending'}
                                className="w-full bg-accent text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg disabled:opacity-50"
                            >
                                {submitStatus === 'sending' ? 'Sending...' : 'Send Message'} <Send size={18} />
                            </button>
                            {submitStatus === 'success' && (
                                <p className="text-accent text-center">Message sent successfully!</p>
                            )}
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-center">Error sending message. Please try again.</p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
