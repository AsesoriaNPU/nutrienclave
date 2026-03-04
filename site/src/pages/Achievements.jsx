import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Flame, Zap, Droplets, Moon, Leaf, Award, Lock, Activity, ShoppingCart, MessageSquare, TrendingUp, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';

const IconMap = {
    Flame, Droplets, Star, Moon, Leaf, Award, Zap
};

// Local calculations moved to context or derived here

const Achievements = () => {
    const navigate = useNavigate();
    const { achievements } = useNutri();
    const [filter, setFilter] = useState('todo');

    const totalXP = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.xp, 0);
    const unlockedCount = achievements.filter(a => a.unlocked).length;

    const filtered = achievements.filter(a => {
        if (filter === 'desbloqueados') return a.unlocked;
        if (filter === 'bloqueados') return !a.unlocked;
        return true;
    });

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Header */}
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/profile')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <div>
                        <h2 className="text-sm font-light uppercase tracking-widest">Logros</h2>
                        <p className="text-zen-label text-primary">{unlockedCount}/{achievements.length} desbloqueados</p>
                    </div>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* XP Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="zen-card p-6 flex items-center gap-6"
                >
                    <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Award size={28} color="white" strokeWidth={1} />
                    </div>
                    <div>
                        <p className="text-3xl font-extralight">{totalXP} <span className="text-sm text-gray-400">XP</span></p>
                        <p className="text-zen-label text-gray-400 uppercase tracking-widest mt-1">Nivel Experto · Rango Enclave</p>
                        <div className="mt-2 h-1 bg-gray-100 rounded-full" style={{ width: '160px' }}>
                            <div className="h-1 bg-primary rounded-full" style={{ width: `${(totalXP / 2000) * 100}%` }} />
                        </div>
                        <p className="text-zen-label text-gray-300 mt-1">{totalXP}/2000 XP para Nivel Maestro</p>
                    </div>
                </motion.div>

                {/* Filter tabs */}
                <div className="flex gap-2">
                    {['todo', 'desbloqueados', 'bloqueados'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`flex-1 py-2 rounded-xl text-xs uppercase tracking-widest font-medium border transition-all cursor-pointer ${filter === f ? 'bg-primary text-white border-primary' : 'bg-white text-gray-400 border-gray-100 hover:border-primary'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Achievement cards */}
                <div className="space-y-3">
                    {filtered.map((a, i) => {
                        const Icon = IconMap[a.icon] || Star;
                        return (
                            <motion.div
                                key={a.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className={`zen-card p-4 flex items-start gap-4 ${!a.unlocked ? 'opacity-70' : ''}`}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: a.unlocked ? `${a.color}15` : '#F1F5F9' }}
                                >
                                    {a.unlocked
                                        ? <Icon size={22} color={a.color} strokeWidth={1.5} />
                                        : <Lock size={18} color="#CBD5E1" strokeWidth={1.5} />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-light text-gray-800">{a.title}</p>
                                        <span className={`text-zen-label uppercase tracking-widest flex-shrink-0 ${a.unlocked ? 'text-primary' : 'text-gray-300'}`}>
                                            +{a.xp} XP
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">{a.subtitle}</p>
                                    {a.unlocked ? (
                                        <p className="text-zen-label text-gray-300 mt-2 uppercase tracking-widest">{a.date}</p>
                                    ) : (
                                        <div className="mt-2 space-y-1">
                                            <div className="flex justify-between">
                                                <span className="text-zen-label text-gray-300 uppercase tracking-widest">{a.current}/{a.target}</span>
                                                <span className="text-zen-label text-gray-300 uppercase tracking-widest">{a.progress}%</span>
                                            </div>
                                            <div className="h-1 bg-gray-100 rounded-full">
                                                <div
                                                    className="h-1 rounded-full transition-all"
                                                    style={{ width: `${a.progress}%`, backgroundColor: a.color }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#76D14B" /></Link>
            </nav>
        </div>
    );
};

export default Achievements;
