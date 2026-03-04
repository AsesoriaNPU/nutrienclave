import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Activity, Droplets, User, ShoppingCart, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';

const StatCard = ({ label, value, unit, icon: Icon, color, change }) => (
    <div className="zen-card p-4 space-y-3">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon size={16} color={color} strokeWidth={1.5} />
                <span className="text-zen-label text-gray-400 uppercase tracking-widest">{label}</span>
            </div>
            {change !== undefined && (
                <span className={`text-zen-label font-medium ${change >= 0 ? 'text-primary' : 'text-red-400'}`}>
                    {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
                </span>
            )}
        </div>
        <div className="text-2xl font-extralight uppercase">
            {value} <span className="text-sm text-gray-400 font-light">{unit}</span>
        </div>
    </div>
);

const EvolutionStats = () => {
    const navigate = useNavigate();
    const { userProfile, dailyStats, calculateBioScore } = useNutri();
    const [activeTab, setActiveTab] = useState('semana');

    // Prepare chart data from history
    const chartData = useMemo(() => {
        const days = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
        const last7Days = [];

        // Populate last 7 days including today
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateKey = d.toISOString().split('T')[0];
            const dayLabel = days[d.getDay()];

            const historyEntry = userProfile.statsHistory.find(h => h.date === dateKey);

            if (dateKey === dailyStats._date) {
                last7Days.push({
                    day: dayLabel,
                    score: calculateBioScore(userProfile, dailyStats),
                    current: true
                });
            } else if (historyEntry) {
                last7Days.push({
                    day: dayLabel,
                    score: historyEntry.score,
                    current: false
                });
            } else {
                last7Days.push({ day: dayLabel, score: 0, current: false });
            }
        }
        return last7Days;
    }, [userProfile.statsHistory, dailyStats, userProfile]);

    const maxScore = Math.max(...chartData.map(d => d.score), 100);
    const currentScore = calculateBioScore(userProfile, dailyStats);

    // Calculate emotional averages
    const emotionalStats = useMemo(() => {
        if (!userProfile.emotionalState || userProfile.emotionalState.length === 0) {
            return [
                { label: 'Control de hambre', value: 0, color: '#76D14B' },
                { label: 'Gestión del estrés', value: 0, color: '#2563EB' },
                { label: 'Nivel de ansiedad', value: 0, color: '#F59E0B' },
            ];
        }

        const recent = userProfile.emotionalState.slice(-10); // Last 10 logs
        const avg = recent.reduce((acc, curr) => ({
            hunger: acc.hunger + curr.hunger,
            stress: acc.stress + curr.stress,
            anxiety: acc.anxiety + curr.anxiety
        }), { hunger: 0, stress: 0, anxiety: 0 });

        const count = recent.length;
        // Invert stress/anxiety: high value = low stress (for positive visual)
        return [
            { label: 'Saciabilidad', value: Math.round(avg.hunger / count), color: '#76D14B' },
            { label: 'Zen Mental', value: 100 - Math.round(avg.stress / count), color: '#2563EB' },
            { label: 'Calma Interior', value: 100 - Math.round(avg.anxiety / count), color: '#F59E0B' },
        ];
    }, [userProfile.emotionalState]);

    const weightProgress = useMemo(() => {
        if (userProfile.weightHistory.length < 2) return 0;
        const last = userProfile.weightHistory[userProfile.weightHistory.length - 1].weight;
        const prev = userProfile.weightHistory[userProfile.weightHistory.length - 2].weight;
        return (((last - prev) / prev) * 100).toFixed(1);
    }, [userProfile.weightHistory]);

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="text-gray-400 border-none bg-transparent cursor-pointer"
                >
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <div>
                    <h2 className="text-sm font-light uppercase tracking-widest">Tu Evolución</h2>
                    <p className="text-zen-label text-gray-400 mt-0.5">Basado en tu actividad real</p>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                <div className="flex gap-2 bg-white rounded-full p-1 border border-gray-100">
                    {['semana', 'mes', 'año'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-full text-xs uppercase tracking-widest font-medium transition-all border-none cursor-pointer ${activeTab === tab
                                ? 'bg-primary text-white'
                                : 'bg-transparent text-gray-400'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="zen-card p-6"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-sm font-light text-gray-600 uppercase tracking-widest">Bio-Enclave Score</h3>
                            <div className="text-4xl font-extralight mt-1">
                                {currentScore}
                                {userProfile.statsHistory.length > 0 && (
                                    <span className={`text-sm font-medium ml-2 ${currentScore >= userProfile.statsHistory[userProfile.statsHistory.length - 1].score ? 'text-primary' : 'text-red-400'}`}>
                                        {currentScore >= userProfile.statsHistory[userProfile.statsHistory.length - 1].score ? '↑' : '↓'}
                                        {Math.abs(currentScore - userProfile.statsHistory[userProfile.statsHistory.length - 1].score)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-primary-soft flex items-center justify-center">
                            <TrendingUp size={20} color="#76D14B" strokeWidth={1.5} />
                        </div>
                    </div>

                    <div className="flex items-end gap-2 h-32">
                        {chartData.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(d.score / maxScore) * 100}%` }}
                                    transition={{ delay: i * 0.07, duration: 0.5 }}
                                    className={`w-full rounded-t-lg ${d.current ? 'bg-primary' : 'bg-gray-400 bg-opacity-10'}`}
                                    style={{ minHeight: '4px' }}
                                />
                                <span className={`text-[10px] uppercase tracking-tighter ${d.current ? 'text-primary font-bold' : 'text-gray-300'}`}>{d.day}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="text-xs text-gray-400 uppercase tracking-widest font-medium">Métricas de Progreso</div>
                <div className="grid grid-cols-2 gap-3">
                    <StatCard
                        label="Peso Actual"
                        value={userProfile.weight || '--'}
                        unit="kg"
                        icon={User}
                        color="#76D14B"
                        change={userProfile.weightHistory.length > 1 ? -weightProgress : undefined}
                    />
                    <StatCard
                        label="Calorías Hoy"
                        value={dailyStats.calories.current}
                        unit="kcal"
                        icon={Activity}
                        color="#2563EB"
                    />
                    <StatCard
                        label="Hidratación"
                        value={dailyStats.water.current}
                        unit="L"
                        icon={Droplets}
                        color="#0EA5E9"
                    />
                    <StatCard
                        label="Registros"
                        value={userProfile.statsHistory.length}
                        unit="días"
                        icon={TrendingUp}
                        color="#F59E0B"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="zen-card p-6 space-y-4"
                >
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest">Equilibrio Bio-Emocional</h3>
                    {emotionalStats.map(({ label, value, color }) => (
                        <div key={label} className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm font-light text-gray-600">{label}</span>
                                <span className="text-sm font-light text-gray-400">{value}%</span>
                            </div>
                            <div className="h-1 bg-gray-400 bg-opacity-10 rounded-full overflow-hidden">
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
                    {userProfile.emotionalState.length === 0 && (
                        <p className="text-[10px] text-gray-400 italic text-center">Registra tu estado en Safe Space para ver tu armonía.</p>
                    )}
                </motion.div>

                <div className="bg-primary-very-soft p-4 rounded-xl border border-primary border-opacity-20">
                    <p className="text-xs italic font-light leading-relaxed text-gray-700">
                        {currentScore >= 80
                            ? "Tu Enclave muestra una coherencia excepcional. Los biomarcadores de hoy indican una recuperación óptima."
                            : "Continúa registrando tu actividad. Cada dato nos ayuda a refinar tu perfil biológico para una mejor personalización."}
                    </p>
                    <p className="text-zen-label text-primary uppercase tracking-widest mt-2">— NutriEnclave IA</p>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#76D14B" /></Link>
            </nav>
        </div>
    );
};

export default EvolutionStats;
