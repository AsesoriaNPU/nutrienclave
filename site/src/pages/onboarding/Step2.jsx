import React from 'react';
import { Watch } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OnboardingStep2 = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md flex flex-col items-center text-center"
            >
                <div className="mb-12">
                    <div className="w-24 h-24 flex items-center justify-center border border-gray-100 rounded-full">
                        <Watch size={48} strokeWidth={1} color="#76D14B" />
                    </div>
                </div>

                <h1 className="text-3xl font-light mb-4 tracking-tight">Sincronía Vital</h1>
                <p className="text-gray-500 mb-12 max-w-xs leading-relaxed">
                    Tus dispositivos alimentan tu Enclave. Sigue tu ritmo cardíaco, sueño y actividad en tiempo real.
                </p>

                <div className="flex gap-2 mb-12">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-[#76D14B]"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>

                <div className="w-full flex justify-between">
                    <button
                        className="text-gray-300 font-light hover:text-gray-500 transition-colors"
                        onClick={() => navigate('/onboarding/1')}
                    >
                        Anterior
                    </button>
                    <button
                        className="text-[#76D14B] font-light hover:opacity-70 transition-opacity"
                        onClick={() => navigate('/onboarding/3')}
                    >
                        Siguiente
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingStep2;
