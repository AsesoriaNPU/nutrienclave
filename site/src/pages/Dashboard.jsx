import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Bell, User, ShoppingCart, MessageSquare, Calendar, ChevronRight, TrendingUp, Utensils, BookOpen, Droplets, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';
import { dashboardData } from '../data/mockData';

const goalInsights = {
    weight: "Tu balance calórico está on-track. Mantén el déficit moderado para resultados sostenibles.",
    energy: "Tu ritmo circadiano muestra una mejora del 15%. Considera aumentar la ingesta de magnesio esta noche.",
    muscle: "Tu ingesta proteica cubre el 85% del objetivo. Añade 20g más post-entrenamiento para optimizar la síntesis muscular.",
    mental: "Tus niveles de Omega-3 están subiendo. Una sesión de meditación guiada potenciará tu enfoque hoy.",
    habit: "Llevas 5 días consecutivos registrando comidas. La consistencia es tu mejor aliada."
};

const Dashboard = () => {
    const { userProfile, dailyStats, incrementStat, calculateBioScore, darkMode, toggleDarkMode } = useNutri();
    const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Experto';
    const stats = dailyStats;

    const score = useMemo(() => calculateBioScore(userProfile, stats), [userProfile, stats, calculateBioScore]);
    const strokeOffset = useMemo(() => 440 - (440 * score / 100), [score]);

    const handleStatClick = (key, amount) => {
        incrementStat(key, amount);
    };

    const aiInsight = useMemo(() => {
        if (userProfile.goals && userProfile.goals.length > 0) {
            const primaryGoal = userProfile.goals[0];
            return goalInsights[primaryGoal] || goalInsights.energy;
        }
        return goalInsights.energy;
    }, [userProfile.goals]);

    const welcomeMessage = useMemo(() => {
        if (score >= 90) return "Tu Enclave está en perfecta armonía hoy.";
        if (score >= 70) return "Buen progreso. Sigue así para alcanzar tu máximo potencial.";
        if (score >= 50) return "Completa tu perfil y registra tu día para mejorar tu Score.";
        return "¡Empieza a registrar tu actividad para activar tu Enclave!";
    }, [score]);

    return (
        <div className="min-h-screen bg-zen-bg pb-20">
            {/* Header */}
            <header className="p-6 bg-white flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
                <h2 className="text-xl font-light uppercase tracking-widest">NutriEnclave</h2>
                <div className="flex gap-4">
                    <button
                        onClick={toggleDarkMode}
                        className="p-1 bg-transparent border-none cursor-pointer text-gray-400 hover:text-primary transition-colors"
                        title={darkMode ? 'Modo Luz' : 'Modo Oscuro'}
                    >
                        {darkMode ? <Sun size={20} strokeWidth={1} /> : <Moon size={20} strokeWidth={1} />}
                    </button>
                    <Link to="/notifications"><Bell size={20} strokeWidth={1} /></Link>
                    <Link to="/profile"><User size={20} strokeWidth={1} /></Link>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Welcome Section */}
                <div className="py-4">
                    <h1 className="text-2xl font-extralight mb-1">Hola, {firstName}</h1>
                    <p className="text-xs text-gray-400">{welcomeMessage}</p>
                </div>

                {/* Score Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="zen-card flex flex-col items-center justify-center text-center py-10 relative overflow-hidden"
                >
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        {/* Minimalist Ring */}
                        <svg className="absolute w-full h-full transform -rotate-90" style={{ left: 0, top: 0 }}>
                            <circle cx="80" cy="80" r="70" fill="none" stroke="#E2E8F0" strokeWidth="1" />
                            <motion.circle
                                cx="80" cy="80" r="70" fill="none" stroke="#76D14B" strokeWidth="1.5"
                                strokeDasharray="440"
                                initial={{ strokeDashoffset: 440 }}
                                animate={{ strokeDashoffset: strokeOffset }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />
                        </svg>
                        <motion.div
                            className="text-5xl font-extralight tracking-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {score}
                        </motion.div>
                    </div>
                    <div className="mt-4 text-zen-label uppercase tracking-widest text-primary font-medium">Bio-Enclave Score</div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="zen-card p-4 space-y-2 cursor-pointer hover:bg-white active:scale-95 transition-all"
                        onClick={() => handleStatClick('steps', 500)}
                    >
                        <Activity size={16} color="#76D14B" strokeWidth={1} />
                        <div className="text-xs text-gray-400 flex justify-between">
                            <span>Pasos</span>
                            <span className="text-[8px] opacity-50">+500</span>
                        </div>
                        <div className="text-lg font-light">{stats.steps.current.toLocaleString('es-ES')} <span className="text-zen-label">pasos</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                            <motion.div
                                className="bg-[#76D14B] h-1 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(stats.steps.current / stats.steps.goal * 100, 100)}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="zen-card p-4 space-y-2 cursor-pointer hover:bg-white active:scale-95 transition-all"
                        onClick={() => handleStatClick('calories', 100)}
                    >
                        <Calendar size={16} color="#2563EB" strokeWidth={1} />
                        <div className="text-xs text-gray-400 flex justify-between">
                            <span>Calorías</span>
                            <span className="text-[8px] opacity-50">+100</span>
                        </div>
                        <div className="text-lg font-light">{stats.calories.current.toLocaleString('es-ES')} <span className="text-zen-label">kcal</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                            <motion.div
                                className="bg-[#2563EB] h-1 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(stats.calories.current / stats.calories.goal * 100, 100)}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="zen-card p-4 space-y-2 cursor-pointer hover:bg-white active:scale-95 transition-all"
                        onClick={() => handleStatClick('water', 0.25)}
                    >
                        <Droplets size={16} color="#06B6D4" strokeWidth={1} />
                        <div className="text-xs text-gray-400 flex justify-between">
                            <span>Hidratación</span>
                            <span className="text-[8px] opacity-50">+0.25L</span>
                        </div>
                        <div className="text-lg font-light">{stats.water.current} <span className="text-zen-label">L</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                            <motion.div
                                className="bg-[#06B6D4] h-1 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(stats.water.current / stats.water.goal * 100, 100)}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="zen-card p-4 space-y-2 cursor-pointer hover:bg-white active:scale-95 transition-all"
                        onClick={() => handleStatClick('sleep', 0.5)}
                    >
                        <Moon size={16} color="#8B5CF6" strokeWidth={1} />
                        <div className="text-xs text-gray-400 flex justify-between">
                            <span>Descanso</span>
                            <span className="text-[8px] opacity-50">+0.5h</span>
                        </div>
                        <div className="text-lg font-light">{stats.sleep.current} <span className="text-zen-label">h</span></div>
                        <div className="w-full bg-gray-100 rounded-full h-1">
                            <motion.div
                                className="bg-[#8B5CF6] h-1 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(stats.sleep.current / stats.sleep.goal * 100, 100)}%` }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* AI Insight */}
                <Link to="/chat" className="block" style={{ textDecoration: 'none' }}>
                    <div className="bg-primary-very-soft p-4 rounded-xl border border-primary border-opacity-20 hover:bg-white transition-all cursor-pointer">
                        <p className="text-xs italic font-light leading-relaxed text-gray-700">
                            "{aiInsight}"
                        </p>
                    </div>
                </Link>

                {/* Safe Space Entry */}
                <Link to="/safe-space" className="block" style={{ textDecoration: 'none' }}>
                    <div className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all border-dashed border-primary border-opacity-40">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                <MessageSquare size={18} color="#76D14B" strokeWidth={1} />
                            </div>
                            <div>
                                <div className="text-sm font-light">Sintonía Emocional</div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Registrar hoy</div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </Link>


                {/* Evolution Stats Entry */}
                <Link to="/evolution" className="block" style={{ textDecoration: 'none' }}>
                    <div className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.1)' }}>
                                <TrendingUp size={18} color="#2563EB" strokeWidth={1} />
                            </div>
                            <div>
                                <div className="text-sm font-light">Tu Evolución</div>
                                <div className="text-zen-label text-gray-400 uppercase tracking-widest">Estadísticas semanales</div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </Link>

                {/* Recipe Quick Access */}
                <Link to="/recipe/1" className="block" style={{ textDecoration: 'none' }}>
                    <div className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(118,209,75,0.1)' }}>
                                <Utensils size={18} color="#76D14B" strokeWidth={1} />
                            </div>
                            <div>
                                <div className="text-sm font-light">Receta del Día</div>
                                <div className="text-zen-label text-gray-400 uppercase tracking-widest">Salmón al vapor · 380 kcal</div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </Link>
                {/* Meal Plan Entry */}
                <Link to="/meal-plan" className="block" style={{ textDecoration: 'none' }}>
                    <div className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.1)' }}>
                                <Calendar size={18} color="#F59E0B" strokeWidth={1} />
                            </div>
                            <div>
                                <div className="text-sm font-light">Plan Nutricional</div>
                                <div className="text-zen-label text-gray-400 uppercase tracking-widest">Semana personalizada</div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </Link>

                {/* Recipe Gallery */}
                <Link to="/recipes" className="block" style={{ textDecoration: 'none' }}>
                    <div className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(118,209,75,0.1)' }}>
                                <BookOpen size={18} color="#76D14B" strokeWidth={1} />
                            </div>
                            <div>
                                <div className="text-sm font-light">Galería de Recetas</div>
                                <div className="text-zen-label text-gray-400 uppercase tracking-widest">6 recetas disponibles</div>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-gray-300" />
                    </div>
                </Link>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#76D14B" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default Dashboard;
