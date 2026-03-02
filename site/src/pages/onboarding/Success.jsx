import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

const SuccessScreen = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md flex flex-col items-center text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-[#76D14B] bg-opacity-10 rounded-full flex items-center justify-center mb-10"
                >
                    <Check size={40} color="#76D14B" strokeWidth={1.5} />
                </motion.div>

                <h1 className="text-4xl font-extralight mb-4 tracking-tight">Tu Enclave está Listo</h1>
                <p className="text-gray-400 mb-12 max-w-xs leading-relaxed font-light">
                    Hemos sincronizado tu ciencia personalizada. Es hora de descubrir tu mejor versión.
                </p>

                <button
                    className="zen-pill-button primary px-12 py-4 text-sm tracking-widest"
                    onClick={() => navigate('/dashboard')}
                >
                    ENTRAR AL ENCLAVE
                </button>
            </motion.div>
        </div>
    );
};

export default SuccessScreen;
