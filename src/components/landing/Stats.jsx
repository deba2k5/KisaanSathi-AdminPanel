import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, IndianRupee, Target, MapPin } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, suffix = '', prefix = '', duration = 2 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            let startTime;
            let animationFrame;

            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = (timestamp - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(value * progress));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(value);
                }
            };

            animationFrame = requestAnimationFrame(animate);

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        }
    }, [isInView, value, duration]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-agricultural-soft-sand border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1"
        >
            <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-agricultural-sunshine-yellow border-3 border-black p-4 rounded-none">
                    <Icon className="h-8 w-8 text-black" />
                </div>
                <div className="text-5xl font-black text-black tracking-tight">
                    {prefix}{count.toLocaleString('en-IN')}{suffix}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-agricultural-stone-gray">
                    {label}
                </div>
            </div>
        </motion.div>
    );
};

const StatsSection = () => {
    const stats = [
        {
            icon: Users,
            label: "Active Farmers",
            value: 15000,
            suffix: "+",
            duration: 2.5
        },
        {
            icon: IndianRupee,
            label: "Loans Approved",
            value: 45,
            prefix: "₹",
            suffix: " Cr",
            duration: 2
        },
        {
            icon: Target,
            label: "Prediction Accuracy",
            value: 98,
            suffix: "%",
            duration: 2.2
        },
        {
            icon: MapPin,
            label: "States Covered",
            value: 12,
            suffix: "+",
            duration: 1.8
        }
    ];

    return (
        <section className="bg-agricultural-soil-brown py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
                        Our Impact
                    </h2>
                    <div className="w-24 h-2 bg-agricultural-sunshine-yellow mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={index}
                            icon={stat.icon}
                            label={stat.label}
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            duration={stat.duration}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <p className="text-white text-lg font-bold uppercase tracking-wide">
                        Empowering Rural India, One Farmer at a Time
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default StatsSection;