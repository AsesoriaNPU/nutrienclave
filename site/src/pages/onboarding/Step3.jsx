import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../../context/NutriContext';

const OnboardingStep3 = () => {
    const navigate = useNavigate();
    const { updateProfile, userProfile } = useNutri();
    const [formData, setFormData] = useState({
        age: userProfile.age || '',
        weight: userProfile.weight || '',
        height: userProfile.height || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        updateProfile({
            age: parseInt(formData.age),
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height)
        });
        navigate('/onboarding/4');
    };

    const isFormValid = formData.age && formData.weight && formData.height;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-zen-bg">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md flex flex-col items-center"
            >
                <div className="mb-10">
                    <div className="w-20 h-20 flex items-center justify-center border border-gray-100 border-opacity-30 rounded-full">
                        <Calendar size={40} strokeWidth={1} className="text-primary" />
                    </div>
                </div>

                <h1 className="text-3xl font-light mb-2 tracking-tight">Tus Datos Vitales</h1>
                <p className="text-gray-400 mb-10 text-center text-sm font-light">
                    Calcularemos tu metabolismo base para personalizar tu plan.
                </p>

                <div className="w-full space-y-6 mb-12">
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Edad</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="25"
                            className="w-full border-b border-gray-100 border-opacity-30 py-2 font-light focus:border-primary bg-transparent text-gray-700 transition-colors outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Peso (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            placeholder="70"
                            className="w-full border-b border-gray-100 py-2 font-light focus:border-[#059669] transition-colors outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-2 text-left">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400 font-medium">Altura (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            placeholder="175"
                            className="w-full border-b border-gray-100 border-opacity-30 py-2 font-light focus:border-primary bg-transparent text-gray-700 transition-colors outline-none"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-between items-center">
                    <button
                        className="text-gray-300 font-light hover:text-gray-500 transition-colors"
                        onClick={() => navigate('/onboarding/1')}
                    >
                        Anterior
                    </button>
                    <button
                        className={`zen-pill-button primary px-10 ${!isFormValid ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                        onClick={handleNext}
                    >
                        Siguiente
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingStep3;
