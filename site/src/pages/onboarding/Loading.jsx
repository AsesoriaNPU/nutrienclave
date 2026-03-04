import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LoadingScreen = () => {
    const navigate = useNavigate();
    const [loadingText, setLoadingText] = useState('Analizando biomarcadores...');

    useEffect(() => {
        const timer1 = setTimeout(() => setLoadingText('Diseñando tu hoja de ruta personal...'), 2000);
        const timer2 = setTimeout(() => setLoadingText('Sincronizando con tu Enclave...'), 4000);
        const timer3 = setTimeout(() => navigate('/success'), 6000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zen-bg overflow-hidden">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Animated Rings */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-gray-400 border-opacity-10 rounded-full"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 border border-primary border-opacity-20 rounded-full border-t-transparent"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 bg-primary rounded-full shadow-[0_0_15px_var(--color-primary)]"
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.p
                    key={loadingText}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-12 text-sm font-light text-gray-400 tracking-wide text-center uppercase"
                >
                    {loadingText}
                </motion.p>
            </AnimatePresence>
        </div>
    );
};

export default LoadingScreen;
