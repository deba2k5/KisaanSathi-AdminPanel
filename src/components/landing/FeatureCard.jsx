import React from 'react';
import { motion } from "framer-motion";

const FeatureCard = ({ icon: Icon, title, desc, variants }) => {
    return (
        <motion.div
            variants={variants}
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

export default FeatureCard;
