import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OnboardingStep1 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md flex flex-col items-center text-center"
            >
                <div className="mb-12">
                    {/* Minimalist Spark Icon */}
                    <div className="w-24 h-24 flex items-center justify-center border border-gray-100 rounded-full relative">
                        <Sparkles size={48} strokeWidth={1} color="#76D14B" />
                        <div className="absolute inset-0 border border-[#76D14B] rounded-full opacity-20 animate-pulse"></div>
                    </div>
                </div>

                <h1 className="text-3xl font-light mb-4 tracking-tight">Tu Consejero Privado</h1>
                <p className="text-gray-500 mb-12 max-w-xs leading-relaxed">
                    Ciencia y precisión en la palma de tu mano. Tu IA analiza cada biomarcador para guiarte.
                </p>

                {/* Progress dots */}
                <div className="flex gap-2 mb-12">
                    <div className="w-2 h-2 rounded-full bg-[#76D14B]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>

                <div className="w-full flex justify-end">
                    <button
                        className="text-[#76D14B] font-light flex items-center gap-1 hover:opacity-70 transition-opacity"
                        onClick={() => navigate('/dashboard')} // Temporary shortcut
                    >
                        Siguiente
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingStep1;
