import React, { useState } from 'react';
import { Target, Zap, Waves, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../../context/NutriContext';

const goals = [
    { id: 'weight', label: 'Control de Peso', icon: Target },
    { id: 'energy', label: 'Energía Vital', icon: Zap },
    { id: 'muscle', label: 'Rendimiento', icon: Waves },
    { id: 'mental', label: 'Focus Mental', icon: Brain },
];

const OnboardingStep4 = () => {
    const navigate = useNavigate();
    const { updateProfile, userProfile } = useNutri();
    const [selected, setSelected] = useState(userProfile.goals || []);

    const toggleGoal = (id) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
        );
    };

    const handleContinue = () => {
        updateProfile({ goals: selected });
        navigate('/onboarding/5');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <h1 className="text-3xl font-light mb-2 text-center tracking-tight">Define tu Enclave</h1>
                <p className="text-gray-400 mb-10 text-center text-sm">¿Cuál es tu prioridad hoy?</p>

                <div className="grid grid-cols-2 gap-4 mb-12">
                    {goals.map((goal) => {
                        const Icon = goal.icon;
                        const isSelected = selected.includes(goal.id);
                        return (
                            <motion.button
                                key={goal.id}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleGoal(goal.id)}
                                className={`zen-card p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${isSelected ? 'border-[#76D14B] bg-[#F0FAF0]' : 'border-gray-100'
                                    }`}
                            >
                                <Icon size={28} strokeWidth={1} color={isSelected ? "#76D14B" : "#CBD5E1"} />
                                <span className={`text-[10px] uppercase tracking-widest ${isSelected ? 'text-[#76D14B]' : 'text-gray-400'}`}>
                                    {goal.label}
                                </span>
                                {isSelected && (
                                    <motion.div
                                        layoutId="check"
                                        className="w-2 h-2 rounded-full bg-[#76D14B]"
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="text-gray-300 font-light hover:text-gray-500 transition-colors"
                        onClick={() => navigate('/onboarding/3')}
                    >
                        Anterior
                    </button>
                    <button
                        className={`zen-pill-button primary px-8 ${selected.length === 0 ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                        onClick={handleContinue}
                    >
                        Continuar
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default OnboardingStep4;
