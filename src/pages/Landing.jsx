import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import LiquidEther from '../components/landing/LiquidEther';
import bgFar from '../assets/bg-farm.png';
import CardSwap from '../components/landing/CardSwap';
import Card from '../components/landing/CardSwap';
import StatsSection from '../components/landing/Stats';
import { MapPin, CheckCircle } from "lucide-react";
import Footer from '../components/landing/Footer';
import HorizontalMarquee from '../components/landing/HorizontalMarquee';
import TypewriterText from '../components/landing/TypewriterText';
import { ArrowRight, Github, Shield, LayoutDashboard, Key, Layers, Server, Leaf, Database, BarChart3, TrendingUp, Sprout } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, desc, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay }}
            className="bg-agricultural-soft-sand border-2 border-agricultural-soil-brown p-8 rounded-xl shadow-[4px_4px_0px_0px_#5C4033] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all group"
        >
            <div className="h-14 w-14 bg-agricultural-forest-green border-2 border-agricultural-soil-brown rounded-lg flex items-center justify-center mb-6 text-agricultural-soft-sand group-hover:scale-110 transition-transform">
                <Icon className="h-7 w-7" />
            </div>
            <h3 className="text-2xl font-black uppercase text-agricultural-soil-brown mb-3">{title}</h3>
            <p className="font-medium text-agricultural-stone-gray leading-relaxed">{desc}</p>
        </motion.div>
    );
};

const ArchitectureItem = ({ title, icon: Icon, items }) => (
    <div className="flex-1 min-w-[300px] bg-white border-2 border-agricultural-soil-brown p-6 rounded-lg shadow-[4px_4px_0px_0px_#5C4033]">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-agricultural-soil-brown border-dashed">
            <Icon className="h-6 w-6 text-agricultural-forest-green" />
            <h3 className="font-black text-lg uppercase text-agricultural-soil-brown">{title}</h3>
        </div>
        <ul className="space-y-3">
            {items.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-600">
                    <div className="h-1.5 w-1.5 bg-agricultural-forest-green rounded-full"></div>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

const Landing = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

    const handleGithubRedirect = () => {
        window.open('https://github.com/deba2k5/agri_front', '_blank');
    };

    return (
        <div className="min-h-screen bg-[#f8f6f4] font-mono text-agricultural-soil-brown overflow-x-hidden selection:bg-agricultural-forest-green selection:text-white">

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-agricultural-soil-brown">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="h-10 w-10 bg-agricultural-forest-green border-2 border-agricultural-soil-brown rounded-lg flex items-center justify-center shadow-[2px_2px_0px_0px_#5C4033]">
                            <Shield className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-black uppercase tracking-tighter text-agricultural-soil-brown">AgroSure<span className="text-agricultural-forest-green">Admin</span></span>
                    </motion.div> */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex gap-4"
                    >
                        <button
                            onClick={handleGithubRedirect}
                            className="bg-white hover:bg-gray-50 border-2 border-agricultural-soil-brown px-4 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2 transition-all hover:shadow-[2px_2px_0px_0px_#5C4033]"
                        >
                            <Github className="h-4 w-4" /> GitHub
                        </button>
                        <Link to="/login" className="bg-agricultural-soil-brown text-white hover:bg-agricultural-soil-brown/90 border-2 border-agricultural-soil-brown px-4 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2 transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[4px_4px_0px_0px_#000]">
                            Login Portal <ArrowRight className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>
            </header>

            <section ref={targetRef} className="relative overflow-hidden">
                <div className="h-[700px] relative">
                    {/* LiquidEther Background */}
                    <div className="absolute inset-0 z-0">
                        <LiquidEther
                            colors={['#e8f5e9', '#c8e6c9', '#a5d6a7']}
                            mouseForce={20}
                            cursorSize={100}
                            isViscous={false}
                            viscous={30}
                            iterationsViscous={32}
                            iterationsPoisson={32}
                            resolution={0.5}
                            isBounce={false}
                            autoDemo={true}
                            autoSpeed={0.5}
                            autoIntensity={2.2}
                            takeoverDuration={0.25}
                            autoResumeDelay={3000}
                            autoRampDuration={0.6}
                        />
                    </div>

                    {/* Farm Image Overlay with reduced opacity */}
                    <div
                        className="absolute inset-0 z-10 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${bgFar})`,
                            opacity: 0.8
                        }}
                    ></div>

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 z-20 bg-black/10"></div>

                    {/* Content */}
                    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                        <motion.div
                            style={{ opacity, scale, y }}
                            className="max-w-3xl text-agricultural-soil-brown animate-fade-in"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Empowering Farmers with
                                <span className="block !text-green-800 min-h-[1.5em]">
                                    <TypewriterText
                                        words={[
                                            'Data-Backed Financial Support',
                                            'AI-Powered Yield Predictions',
                                            'Smart Farming Solutions',
                                            'Agricultural Loan Assistance'
                                        ]}
                                        speed={100}
                                        delay={2000}
                                    />
                                </span>
                            </h1>
                            <p className="text-md md:text-2xl mb-8 text-agricultural-soil-brown leading-relaxed">
                                Get accurate yield predictions and secure agricultural loans with confidence.
                                Our AI-powered platform helps you make informed farming decisions.
                            </p>
                            {/* In your index.jsx or component file */}
                            <div className="flex flex-wrap justify-start gap-6 mt-10 ml-0 sm:ml-4">
                                {/* Start Your Journey Button */}
                                <button
                                    className="neo-brutalist-button bg-agricultural-soil-brown hover:bg-amber-600 text-white font-bold py-3 px-8 border-4 border-black shadow-[6px_6px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5"
                                    onClick={() => setIsAuthOpen(true)}
                                >
                                    Start Your Journey
                                </button>

                                {/* Learn More Button (Outline Variant) */}
                                <button className="neo-brutalist-button bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 border-4 border-black shadow-[6px_6px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] active:shadow-[2px_2px_0_0_#000] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0.5">
                                    Learn More
                                </button>
                            </div>

                            <style jsx>{`
  .neo-brutalist-button {
    position: relative;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
  }

  .neo-brutalist-button:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 0 #000 !important;
  }

  .neo-brutalist-button:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.2);
  }
`}</style>
                        </motion.div>
                    </div>
                </div>
            </section >

            <HorizontalMarquee

            />



            {/* Architecture Section (Carousel Concept) */}
            <section className="py-24 px-6 bg-agricultural-soft-sand border-t-2 border-agricultural-soil-brown overflow-hidden" >
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                        <div>
                            <div className="inline-block bg-white border-2 border-agricultural-soil-brown px-3 py-1 rounded mb-4 font-bold uppercase text-xs shadow-[2px_2px_0px_0px_#5C4033]">
                                Technical Stack
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">System Architecture</h2>
                        </div>
                        <p className="text-agricultural-stone-gray font-bold max-w-md text-right md:text-left">
                            A robust MERN stack implementation enhanced with AI microservices and blockchain simulation listeners.
                        </p>
                    </div>

                    {/* Horizontal Scroll / Carousel for Architecture Items */}

                    <style>
                        {`
            @keyframes carousel {
                0% {
                    transform: translateX(0);
                }
                100% {
                    transform: translateX(-50%);
                }
            }
            
            .animate-carousel {
                animation: carousel 30s linear infinite;
            }
            
            .animate-carousel:hover {
                animation-play-state: paused;
            }
        `}
                    </style>

                    <div className="relative overflow-hidden">
                        <div className="flex animate-carousel">
                            <div className="flex gap-6 min-w-max">
                                <ArchitectureItem
                                    title="Frontend Client"
                                    icon={LayoutDashboard}
                                    items={['React.js + Vite', 'TailwindCSS + Framer Motion', 'PWA Capabilities', 'TanStack Query']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="API Gateway"
                                    icon={Server}
                                    items={['Node.js + Express', 'JWT Authentication', 'Rate Limiting', 'Multer File Uploads']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="Data & AI Layer"
                                    icon={Database}
                                    items={['MongoDB Atlas (Vector Search)', 'Groq SDK (Llama 3)', 'Gemini (Vision Analysis)', 'TensorFlow (Mock Fraud)']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="Settlement Layer"
                                    icon={Key}
                                    items={['Simulated Blockchain Ledger', 'Smart Contract Triggers', 'Immutable Audit Logs', 'Automated Disbursement']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                            </div>
                            {/* Duplicate for seamless loop */}
                            <div className="flex gap-6 min-w-max ml-6">
                                <ArchitectureItem
                                    title="Frontend Client"
                                    icon={LayoutDashboard}
                                    items={['React.js + Vite', 'TailwindCSS + Framer Motion', 'PWA Capabilities', 'TanStack Query']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="API Gateway"
                                    icon={Server}
                                    items={['Node.js + Express', 'JWT Authentication', 'Rate Limiting', 'Multer File Uploads']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="Data & AI Layer"
                                    icon={Database}
                                    items={['MongoDB Atlas (Vector Search)', 'Groq SDK (Llama 3)', 'Gemini (Vision Analysis)', 'TensorFlow (Mock Fraud)']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                                <ArchitectureItem
                                    title="Settlement Layer"
                                    icon={Key}
                                    items={['Simulated Blockchain Ledger', 'Smart Contract Triggers', 'Immutable Audit Logs', 'Automated Disbursement']}
                                />
                                <div className="flex items-center text-agricultural-stone-gray">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

      <StatsSection />
      
      <section className="py-16 bg-white border-t-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-black mb-8 uppercase tracking-tight">
              Trusted by Leading Financial Institutions
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-6">
              {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Bank of Baroda"].map((bank, index) => (
                <div 
                  key={index} 
                  className="text-lg font-black text-black bg-yellow-300 px-8 py-4 rounded-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all duration-200 animate-slide-in"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'backwards'
                  }}
                >
                  {bank}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes slide-in {
            from {
              opacity: 0;
              transform: translateY(30px) scale(0.9);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .animate-slide-in {
            animation: slide-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}</style>
      </section>

            <Footer />
        </div >
    );
};

export default Landing;
