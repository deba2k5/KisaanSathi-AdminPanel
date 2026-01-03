import React from 'react';
import MagnifyingCursor from '../FluidGlass';
import FeatureCard from './FeatureCard';
import { LayoutDashboard, Database, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// HorizontalMarquee Component
const HorizontalMarquee = ({ text, speed = 20, reverse = false }) => {
    return (
        <div className="relative overflow-hidden whitespace-nowrap">
            <div
                className={`inline-block ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}
                style={{ animationDuration: `${speed}s` }}
            >
                <span className="inline-block px-8">{text}</span>
                <span className="inline-block px-8">{text}</span>
                <span className="inline-block px-8">{text}</span>
                <span className="inline-block px-8">{text}</span>
            </div>

            <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-scroll-left {
          animation: scrollLeft linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight linear infinite;
        }
      `}</style>
        </div>
    );
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.4
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

// Main Demo Component
export default function App() {
    return (
        <div className="">

            {/* Second Marquee Row */}
            <div className="bg-gray-200 text-black py-8 border-b border-gray-400">
                <HorizontalMarquee
                    text="🌾 PRECISION AGRICULTURE SOLUTIONS  •  AI-POWERED YIELD PREDICTION  •  REAL-TIME CROP MONITORING  •  "
                    speed={25}
                    reverse={true}
                />
            </div>

            {/* Third Marquee Row */}
            <div className="bg-agricultural-soil-brown text-white py-8 border-b border-gray-800">
                <HorizontalMarquee
                    text="💧 SMART IRRIGATION SYSTEMS  •  SOIL HEALTH ANALYTICS  •  CROP DISEASE DETECTION  •  "
                    speed={30}
                />
            </div>

            {/* Content Section */}
            < section id="features" className="py-24 px-6 bg-white border-t-2 border-agricultural-soil-brown" >
                <div className="container mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Core Modules</h2>
                        <div className="h-2 w-24 bg-agricultural-forest-green mx-auto"></div>
                    </div>
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <FeatureCard
                            icon={LayoutDashboard}
                            title="Claim Adjudication"
                            desc="Comprehensive dashboard for reviewing evidence, validating policies, and issuing final verdicts on insurance claims."
                            variants={cardVariants}
                        />
                        <FeatureCard
                            icon={Database}
                            title="Smart Contracts"
                            desc="Automated settlement layer triggering blockchain transactions immediately upon claim approval."
                            variants={cardVariants}
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Fraud Guard AI"
                            desc="Real-time anomaly detection scoring every application against historical patterns to prevent leakage."
                            variants={cardVariants}
                        />
                    </motion.div>
                </div>
            </section >

            

           
        </div>
    );
}

// Export the HorizontalMarquee component separately if needed
export { HorizontalMarquee };