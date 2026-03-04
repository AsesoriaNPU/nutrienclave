import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Flame, Sun, Moon, Utensils, TrendingUp, Activity, ShoppingCart, MessageSquare, User, ShoppingBag } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const history = [
    {
        date: 'Hoy — Lunes, 23 Feb',
        totalKcal: 1380,
        meals: [
            { time: '08:20', type: 'Desayuno', icon: Sun, color: '#F59E0B', name: 'Smoothie verde y tostada de centeno', kcal: 290, macros: { p: 12, c: 38, g: 8 } },
            { time: '13:45', type: 'Almuerzo', icon: Utensils, color: '#76D14B', name: 'Bowl de Quinoa con Verduras', kcal: 320, macros: { p: 14, c: 45, g: 9 } },
            { time: '20:10', type: 'Cena', icon: Moon, color: '#2563EB', name: 'Salmón al vapor con Espárragos', kcal: 380, macros: { p: 38, c: 12, g: 16 } },
            { time: '11:00', type: 'Snack', icon: ShoppingBag, color: '#10B981', name: 'Nueces y arándanos', kcal: 180, macros: { p: 4, c: 18, g: 11 } },
            { time: '17:30', type: 'Snack', icon: ShoppingBag, color: '#10B981', name: 'Yogur griego con miel', kcal: 210, macros: { p: 15, c: 22, g: 5 } },
        ],
    },
    {
        date: 'Ayer — Domingo, 22 Feb',
        totalKcal: 1520,
        meals: [
            { time: '09:00', type: 'Desayuno', icon: Sun, color: '#F59E0B', name: 'Porridge de avena con frutos rojos', kcal: 260, macros: { p: 8, c: 42, g: 7 } },
            { time: '14:00', type: 'Almuerzo', icon: Utensils, color: '#76D14B', name: 'Ensalada Mediterránea con atún', kcal: 290, macros: { p: 28, c: 15, g: 12 } },
            { time: '20:30', type: 'Cena', icon: Moon, color: '#2563EB', name: 'Pollo con Cúrcuma y Verduras', kcal: 420, macros: { p: 42, c: 18, g: 14 } },
            { time: '16:00', type: 'Snack', icon: ShoppingBag, color: '#10B981', name: 'Manzana y mantequilla de almendra', kcal: 190, macros: { p: 5, c: 24, g: 10 } },
            { time: '10:30', type: 'Snack', icon: ShoppingBag, color: '#10B981', name: 'Café con leche de avena', kcal: 80, macros: { p: 2, c: 12, g: 2 } },
        ],
    },
    {
        date: 'Sábado, 21 Feb',
        totalKcal: 1290,
        meals: [
            { time: '08:45', type: 'Desayuno', icon: Sun, color: '#F59E0B', name: 'Huevos revueltos con aguacate', kcal: 310, macros: { p: 18, c: 8, g: 22 } },
            { time: '13:30', type: 'Almuerzo', icon: Utensils, color: '#76D14B', name: 'Crema de Calabaza con Jengibre', kcal: 210, macros: { p: 5, c: 35, g: 7 } },
            { time: '19:45', type: 'Cena', icon: Moon, color: '#2563EB', name: 'Trucha con Almendras y Limón', kcal: 340, macros: { p: 35, c: 10, g: 18 } },
            { time: '16:30', type: 'Snack', icon: ShoppingBag, color: '#10B981', name: 'Infusión verde y galletas de arroz', kcal: 120, macros: { p: 2, c: 22, g: 3 } },
        ],
    },
];

const MacroBadge = ({ label, value, color }) => (
    <span className="text-zen-label uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
        {label} {value}g
    </span>
);

const FoodHistory = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');

    const filtered = history.map(day => ({
        ...day,
        meals: day.meals.filter(m => m.name.toLowerCase().includes(search.toLowerCase())),
    })).filter(day => day.meals.length > 0);

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-4">
                    <button onClick={() => navigate('/profile')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <h2 className="text-sm font-light uppercase tracking-widest">Historial de Comidas</h2>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <Search size={16} color="#94A3B8" strokeWidth={1.5} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar alimento..."
                        className="flex-1 bg-transparent border-none text-sm font-light focus:outline-none placeholder-gray-300"
                    />
                </div>
            </header>

            <main className="p-6 space-y-8 max-w-2xl mx-auto">
                {filtered.map((day, di) => (
                    <motion.div
                        key={day.date}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: di * 0.08 }}
                    >
                        {/* Day header */}
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-zen-label text-gray-400 uppercase tracking-widest">{day.date}</p>
                            <div className="flex items-center gap-1.5 text-primary">
                                <Flame size={13} strokeWidth={1.5} />
                                <span className="text-sm font-light">{day.totalKcal} kcal</span>
                            </div>
                        </div>

                        {/* Meal items */}
                        <div className="space-y-2">
                            {day.meals.sort((a, b) => a.time.localeCompare(b.time)).map((meal, mi) => {
                                const Icon = meal.icon;
                                return (
                                    <div key={mi} className="zen-card p-4 flex items-start gap-4">
                                        <div
                                            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                                            style={{ backgroundColor: `${meal.color}15` }}
                                        >
                                            <Icon size={16} color={meal.color} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <p className="text-xs text-gray-400 font-light uppercase tracking-widest">{meal.type} · {meal.time}</p>
                                                    <p className="text-sm font-light text-gray-700 mt-0.5 leading-tight">{meal.name}</p>
                                                </div>
                                                <span className="text-sm font-light text-primary flex-shrink-0">{meal.kcal} kcal</span>
                                            </div>
                                            <div className="flex gap-1.5 mt-2 flex-wrap">
                                                <MacroBadge label="P" value={meal.macros.p} color="#76D14B" />
                                                <MacroBadge label="C" value={meal.macros.c} color="#F59E0B" />
                                                <MacroBadge label="G" value={meal.macros.g} color="#0EA5E9" />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default FoodHistory;
