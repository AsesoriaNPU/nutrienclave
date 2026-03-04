import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../../context/NutriContext';

const OnboardingStep5 = () => {
    const navigate = useNavigate();
    const { updateProfile, userProfile } = useNutri();
    const [formData, setFormData] = useState({
        name: userProfile.name || '',
        email: userProfile.email || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFinish = () => {
        updateProfile(formData);
        navigate('/loading');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zen-bg">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <h1 className="text-3xl font-light mb-2 text-center tracking-tight">Casi allí</h1>
                <p className="text-gray-400 mb-10 text-center text-sm font-light">Completa tu perfil para una precisión máxima.</p>

                <div className="space-y-6 mb-12">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Ej. Angel Benito"
                            className="w-full border-b border-gray-100 border-opacity-30 py-2 font-light focus:border-primary bg-transparent text-gray-700 transition-colors outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="tu@email.com"
                            className="w-full border-b border-gray-100 border-opacity-30 py-2 font-light focus:border-primary bg-transparent text-gray-700 transition-colors outline-none"
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="text-gray-300 font-light hover:text-gray-500 transition-colors"
                        onClick={() => navigate('/onboarding/4')}
                    >
                        Anterior
                    </button>
                    <button
                        className="zen-pill-button primary px-10"
                        onClick={handleFinish}
                    >
                        Finalizar
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingStep5;
