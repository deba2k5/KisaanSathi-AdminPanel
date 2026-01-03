import React from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Twitter, 
    Linkedin, 
    Instagram,
    Wheat,
    ArrowRight
} from 'lucide-react';

const FooterSection = () => {
    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'How It Works', href: '#how-it-works' },
            { name: 'Pricing', href: '#pricing' },
            { name: 'FAQ', href: '#faq' }
        ],
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Careers', href: '#careers' },
            { name: 'Blog', href: '#blog' },
            { name: 'Press Kit', href: '#press' }
        ],
        resources: [
            { name: 'Documentation', href: '#docs' },
            { name: 'API Reference', href: '#api' },
            { name: 'Support', href: '#support' },
            { name: 'Community', href: '#community' }
        ],
        legal: [
            { name: 'Privacy Policy', href: '#privacy' },
            { name: 'Terms of Service', href: '#terms' },
            { name: 'Cookie Policy', href: '#cookies' },
            { name: 'Compliance', href: '#compliance' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Instagram, href: '#', label: 'Instagram' }
    ];

    return (
        <section className="bg-agricultural-soil-brown border-t-8 border-black">
            {/* Newsletter Section */}
            <div className="border-b-4 border-black py-12 px-6">
                <div className="max-screen mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-white">
                                Stay Updated
                            </h3>
                            <p className="text-agricultural-soft-sand font-bold">
                                Get the latest updates on agricultural finance
                            </p>
                        </div>
                        <div className="flex w-full md:w-auto gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-4 border-4 border-black text-black font-bold placeholder:text-agricultural-stone-gray focus:outline-none focus:ring-4 focus:ring-agricultural-sunshine-yellow w-full md:w-80 bg-white"
                            />
                            <button className="bg-agricultural-sunshine-yellow text-black px-6 py-4 border-4 border-black font-black uppercase hover:bg-agricultural-sunshine-yellow/90 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 flex items-center gap-2 whitespace-nowrap">
                                Subscribe
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-screen mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-agricultural-sunshine-yellow p-3 border-3 border-black">
                                <Wheat className="h-8 w-8 text-black" />
                            </div>
                            <span className="text-2xl font-black uppercase tracking-tight text-white">
                                KrishiCredit
                            </span>
                        </div>
                        <p className="text-agricultural-soft-sand font-bold mb-6 leading-relaxed">
                            Empowering farmers with AI-driven credit solutions. Bridging the gap between rural agriculture and modern finance.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-agricultural-sunshine-yellow" />
                                <span className="font-bold text-white">info@krishicredit.in</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-agricultural-sunshine-yellow" />
                                <span className="font-bold text-white">+91 1800-KRISHI</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-agricultural-sunshine-yellow" />
                                <span className="font-bold text-white">Mumbai, Maharashtra</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wide mb-4 text-agricultural-sunshine-yellow">
                            Product
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-white hover:text-agricultural-sunshine-yellow font-bold transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wide mb-4 text-agricultural-sunshine-yellow">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-white hover:text-agricultural-sunshine-yellow font-bold transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wide mb-4 text-agricultural-sunshine-yellow">
                            Resources
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-white hover:text-agricultural-sunshine-yellow font-bold transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-black uppercase tracking-wide mb-4 text-agricultural-sunshine-yellow">
                            Legal
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a 
                                        href={link.href}
                                        className="text-white hover:text-agricultural-sunshine-yellow font-bold transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="border-t-4 border-black pt-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="bg-agricultural-sunshine-yellow p-3 border-3 border-black hover:bg-white transition-colors group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <social.icon className="h-5 w-5 text-black" />
                                </a>
                            ))}
                        </div>
                        <div className="flex gap-6 text-sm font-bold text-white">
                            <span>© 2025 KrishiCredit</span>
                            <span>•</span>
                            <span>All Rights Reserved</span>
                        </div>
                    </div>
                </div>

                {/* Compliance Badges */}
                <div className="bg-black border-4 border-agricultural-sunshine-yellow p-6 text-center">
                    <p className="text-sm font-bold text-agricultural-sunshine-yellow mb-3 uppercase tracking-wider">
                        Trusted & Certified By
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-6">
                        <div className="bg-white px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-black font-black text-xs">RBI APPROVED</span>
                        </div>
                        <div className="bg-white px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-black font-black text-xs">ISO 27001</span>
                        </div>
                        <div className="bg-white px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-black font-black text-xs">MSME REGISTERED</span>
                        </div>
                        <div className="bg-white px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="text-black font-black text-xs">DIGITAL INDIA</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;