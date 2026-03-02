import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, Utensils, Sun, Sunset, Moon, Activity, ShoppingCart, MessageSquare, TrendingUp, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const mealPlan = {
    Lunes: {
        desayuno: { name: 'Smoothie verde con espinacas y plátano', kcal: 280, recipeId: '2' },
        almuerzo: { name: 'Bowl de Quinoa con Verduras', kcal: 320, recipeId: '2' },
        cena: { name: 'Salmón al vapor con Espárragos', kcal: 380, recipeId: '1' },
    },
    Martes: {
        desayuno: { name: 'Huevos revueltos con aguacate', kcal: 310, recipeId: '4' },
        almuerzo: { name: 'Ensalada Mediterránea con atún', kcal: 290, recipeId: '4' },
        cena: { name: 'Pollo con Cúrcuma y Verduras', kcal: 420, recipeId: '3' },
    },
    Miércoles: {
        desayuno: { name: 'Porridge de avena con frutos rojos', kcal: 260, recipeId: '2' },
        almuerzo: { name: 'Crema de Calabaza con Jengibre', kcal: 210, recipeId: '5' },
        cena: { name: 'Trucha con Almendras y Limón', kcal: 340, recipeId: '6' },
    },
    Jueves: {
        desayuno: { name: 'Yogur griego con semillas de chía', kcal: 220, recipeId: '2' },
        almuerzo: { name: 'Wok de verduras con tofu', kcal: 300, recipeId: '2' },
        cena: { name: 'Salmón al vapor con Espárragos', kcal: 380, recipeId: '1' },
    },
    Viernes: {
        desayuno: { name: 'Tostadas de centeno con guacamole', kcal: 290, recipeId: '4' },
        almuerzo: { name: 'Ensalada de Aguacate y Huevo', kcal: 280, recipeId: '4' },
        cena: { name: 'Pollo con Cúrcuma y Verduras', kcal: 420, recipeId: '3' },
    },
};

const days = Object.keys(mealPlan);
const mealIcons = {
    desayuno: { icon: Sun, color: '#F59E0B', label: 'Desayuno' },
    almuerzo: { icon: Utensils, color: '#76D14B', label: 'Almuerzo' },
    cena: { icon: Moon, color: '#2563EB', label: 'Cena' },
};

const MealPlan = () => {
    const navigate = useNavigate();
    const today = days[new Date().getDay() - 1] || days[0];
    const [activeDay, setActiveDay] = useState(today);

    const dayData = mealPlan[activeDay] || mealPlan[days[0]];
    const totalKcal = Object.values(dayData).reduce((sum, m) => sum + m.kcal, 0);

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Header */}
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-1">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 border-none bg-transparent cursor-pointer"
                    >
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <div>
                        <h2 className="text-sm font-light uppercase tracking-widest">Plan Nutricional</h2>
                        <p className="text-zen-label text-gray-400">Semana personalizada por tu IA</p>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Day selector */}
                <div className="flex gap-2 overflow-x-auto" style={{ paddingBottom: '4px' }}>
                    {days.map(day => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={`flex-shrink-0 px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer border ${activeDay === day
                                    ? 'bg-primary text-white border-primary'
                                    : 'bg-white text-gray-400 border-gray-100 hover:border-primary'
                                }`}
                        >
                            <div className="uppercase tracking-widest">{day.slice(0, 3)}</div>
                        </button>
                    ))}
                </div>

                {/* Total kcal */}
                <motion.div
                    key={activeDay}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="zen-card p-4 flex items-center justify-between"
                >
                    <div>
                        <p className="text-zen-label text-gray-400 uppercase tracking-widest">{activeDay}</p>
                        <p className="text-2xl font-extralight mt-1">{totalKcal} <span className="text-sm text-gray-400">kcal totales</span></p>
                    </div>
                    <div className="w-16 h-16 relative">
                        <svg viewBox="0 0 60 60" className="w-full h-full transform -rotate-90">
                            <circle cx="30" cy="30" r="24" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                            <circle cx="30" cy="30" r="24" fill="none" stroke="#76D14B" strokeWidth="3"
                                strokeDasharray={`${(totalKcal / 2000) * 150} 150`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-zen-label text-primary font-medium">{Math.round((totalKcal / 2000) * 100)}%</span>
                        </div>
                    </div>
                </motion.div>

                {/* Meals */}
                <div className="space-y-3">
                    {Object.entries(dayData).map(([mealKey, meal], i) => {
                        const { icon: Icon, color, label } = mealIcons[mealKey];
                        return (
                            <motion.div
                                key={`${activeDay}-${mealKey}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link to={`/recipe/${meal.recipeId}`} style={{ textDecoration: 'none' }}>
                                    <div className="zen-card p-4 flex items-center gap-4 hover:bg-gray-50 transition-all cursor-pointer">
                                        <div
                                            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${color}15` }}
                                        >
                                            <Icon size={18} color={color} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-zen-label text-gray-400 uppercase tracking-widest">{label}</p>
                                            <p className="text-sm font-light text-gray-700 truncate mt-1">{meal.name}</p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className="text-sm font-light text-primary">{meal.kcal} kcal</span>
                                            <ChevronRight size={14} color="#CBD5E1" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* AI note */}
                <div className="bg-primary-very-soft p-4 rounded-xl border border-primary border-opacity-20">
                    <p className="text-xs italic font-light leading-relaxed text-gray-700">
                        "Este plan está calibrado para tu perfil metabólico. El balance de omega-3 y antioxidantes potenciará tu Bio-Enclave Score esta semana."
                    </p>
                    <p className="text-zen-label text-primary uppercase tracking-widest mt-2">— NutriEnclave IA</p>
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#76D14B" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default MealPlan;
