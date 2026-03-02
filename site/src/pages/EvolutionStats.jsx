import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Activity, Droplets, User, ShoppingCart, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';

const weeklyData = [
    { day: 'L', score: 78, calories: 1820, water: 2.1 },
    { day: 'M', score: 82, calories: 1650, water: 2.4 },
    { day: 'X', score: 75, calories: 2100, water: 1.8 },
    { day: 'J', score: 88, calories: 1730, water: 2.6 },
    { day: 'V', score: 85, calories: 1590, water: 2.2 },
    { day: 'S', score: 90, calories: 1800, water: 2.8 },
    { day: 'D', score: 92, calories: 1700, water: 3.0 },
];

const maxScore = Math.max(...weeklyData.map(d => d.score));

const StatCard = ({ label, value, unit, icon: Icon, color, change }) => (
    <div className="zen-card p-4 space-y-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon size={16} color={color} strokeWidth={1.5} />
                <span className="text-zen-label text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            {change && (
                <span className={`text-zen-label font-medium ${change > 0 ? 'text-primary' : 'text-red-400'}`}>
                    {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
            )}
        </div>
        <div className="text-2xl font-extralight">
            {value} <span className="text-sm text-gray-400 font-light">{unit}</span>
        </div>
    </div>
);

const EvolutionStats = () => {
    const navigate = useNavigate();
    const { userProfile } = useNutri();
    const [activeTab, setActiveTab] = useState('semana');

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Header */}
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-400 border-none bg-transparent cursor-pointer"
                >
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <div>
                    <h2 className="text-sm font-light uppercase tracking-widest">Tu Evolución</h2>
                    <p className="text-zen-label text-gray-400 mt-0.5">Equilibrio Bio-Emocional</p>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">

                {/* Tab switcher */}
                <div className="flex gap-2 bg-white rounded-full p-1 border border-gray-100">
                    {['semana', 'mes', 'año'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all border-none cursor-pointer ${activeTab === tab
                                    ? 'bg-primary text-white'
                                    : 'bg-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Bio-Enclave Score Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="zen-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-sm font-light text-gray-600 uppercase tracking-widest">Bio-Enclave Score</h3>
                            <div className="text-4xl font-extralight mt-1">92 <span className="text-sm text-primary font-medium">↑ 8%</span></div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center">
                            <TrendingUp size={20} color="#76D14B" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Bar chart */}
                    <div className="flex items-end gap-2 h-32">
                        {weeklyData.map((d, i) => (
                            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.score / maxScore) * 100}%` }}
                                    transition={{ delay: i * 0.07, duration: 0.5 }}
                                    className={`w-full rounded-t-lg ${i === weeklyData.length - 1 ? 'bg-primary' : 'bg-gray-100'}`}
                                    style={{ minHeight: '4px' }}
                                />
                                <span className="text-zen-label text-gray-400">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Detalle Semanal</div>
                <div className="grid grid-cols-2 gap-3">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <StatCard
                            label="Peso Actual"
                            value="72.4"
                            unit="kg"
                            icon={User}
                            color="#76D14B"
                            change={-1.2}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <StatCard
                            label="Grasa Corporal"
                            value="18.6"
                            unit="%"
                            icon={Activity}
                            color="#2563EB"
                            change={-0.8}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatCard
                            label="Hidratación"
                            value="2.4"
                            unit="L / día"
                            icon={Droplets}
                            color="#0EA5E9"
                            change={5}
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <StatCard
                            label="Adherencia"
                            value="87"
                            unit="%"
                            icon={TrendingUp}
                            color="#F59E0B"
                            change={12}
                        />
                    </motion.div>
                </div>

                {/* Emotional Harmony Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="zen-card p-6 space-y-4"
                >
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest">Armonía Emocional</h3>
                    {[
                        { label: 'Control de hambre', value: 78, color: '#76D14B' },
                        { label: 'Gestión del estrés', value: 65, color: '#2563EB' },
                        { label: 'Nivel de ansiedad', value: 42, color: '#F59E0B' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-light text-gray-600">{label}</span>
                                <span className="text-sm font-light text-gray-400">{value}%</span>
                            </div>
                            <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* AI Insight */}
                <div className="bg-primary-very-soft p-4 rounded-xl border border-primary border-opacity-20">
                    <p className="text-xs italic font-light leading-relaxed text-gray-700">
                        "Tu progreso esta semana es excepcional. El Score de 92 refleja una sincronía perfecta entre nutrición y bienestar emocional. Mantén el ritmo con la hidratación."
                    </p>
                    <p className="text-zen-label text-primary uppercase tracking-widest mt-2">— NutriEnclave IA</p>
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><Activity size={24} strokeWidth={1} color="#76D14B" /></Link>
            </nav>
        </div>
    );
};

export default EvolutionStats;
