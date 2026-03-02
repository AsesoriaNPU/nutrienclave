import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bell, CheckCheck, Flame, TrendingUp, MessageSquare, Utensils, Activity, ShoppingCart, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const initialNotifications = [
    {
        id: 1,
        type: 'ai',
        icon: TrendingUp,
        color: '#76D14B',
        title: 'Tu Bio-Enclave Score mejoró',
        body: 'Subiste 8 puntos esta semana. Tu ritmo circadiano está en sincronía perfecta.',
        time: 'Hace 10 min',
        read: false,
    },
    {
        id: 2,
        type: 'meal',
        icon: Utensils,
        color: '#F59E0B',
        title: 'Hora del almuerzo',
        body: 'Tu plan nutricional sugiere: Bowl de Quinoa con Verduras (320 kcal).',
        time: 'Hace 1 hora',
        read: false,
    },
    {
        id: 3,
        type: 'hydration',
        icon: Flame,
        color: '#0EA5E9',
        title: 'Hidratación',
        body: 'Has bebido solo 1.2L hoy. Tu objetivo es 2.5L. ¡Recuerda hidratarte!',
        time: 'Hace 2 horas',
        read: false,
    },
    {
        id: 4,
        type: 'chat',
        icon: MessageSquare,
        color: '#2563EB',
        title: 'Nuevo insight de tu IA',
        body: 'El magnesio antes de dormir puede mejorar tu calidad de sueño un 23% según tu historial.',
        time: 'Ayer',
        read: true,
    },
    {
        id: 5,
        type: 'ai',
        icon: TrendingUp,
        color: '#76D14B',
        title: 'Semana completada',
        body: '¡Enhorabuena! Completaste el 87% de tu plan nutricional esta semana.',
        time: 'Hace 2 días',
        read: true,
    },
    {
        id: 6,
        type: 'meal',
        icon: Utensils,
        color: '#F59E0B',
        title: 'Receta recomendada',
        body: 'Basado en tus biomarcadores: Salmón al vapor con Espárragos es ideal para hoy.',
        time: 'Hace 3 días',
        read: true,
    },
];

const Notifications = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(initialNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const markRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Header */}
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="text-gray-400 border-none bg-transparent cursor-pointer"
                        >
                            <ArrowLeft size={20} strokeWidth={1} />
                        </button>
                        <div>
                            <h2 className="text-sm font-light uppercase tracking-widest">Notificaciones</h2>
                            {unreadCount > 0 && (
                                <p className="text-zen-label text-primary">{unreadCount} sin leer</p>
                            )}
                        </div>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllRead}
                            className="flex items-center gap-1.5 text-zen-label text-gray-400 border-none bg-transparent cursor-pointer hover:text-primary transition-all"
                        >
                            <CheckCheck size={14} strokeWidth={1.5} />
                            <span className="uppercase tracking-widest">Marcar todo</span>
                        </button>
                    )}
                </div>
            </header>

            <main className="p-6 space-y-3 max-w-2xl mx-auto">
                <AnimatePresence>
                    {notifications.map((notif, i) => {
                        const Icon = notif.icon;
                        return (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => markRead(notif.id)}
                                className={`zen-card p-4 flex items-start gap-4 cursor-pointer hover:bg-gray-50 transition-all ${!notif.read ? 'border-l-2' : ''
                                    }`}
                                style={!notif.read ? { borderLeftColor: notif.color } : {}}
                            >
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${notif.color}15` }}
                                >
                                    <Icon size={18} color={notif.color} strokeWidth={1.5} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm font-light ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>
                                            {notif.title}
                                        </p>
                                        {!notif.read && (
                                            <div
                                                className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                                                style={{ backgroundColor: notif.color, minWidth: '8px', minHeight: '8px' }}
                                            />
                                        )}
                                    </div>
                                    <p className="text-xs font-light text-gray-400 mt-1 leading-relaxed">{notif.body}</p>
                                    <p className="text-zen-label text-gray-300 mt-2 uppercase tracking-widest">{notif.time}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {notifications.every(n => n.read) && (
                    <div className="text-center py-12 space-y-3">
                        <div className="w-16 h-16 rounded-full bg-primary-soft flex items-center justify-center mx-auto">
                            <Bell size={28} color="#76D14B" strokeWidth={1} />
                        </div>
                        <p className="text-sm font-light text-gray-400">Todo al día</p>
                        <p className="text-zen-label text-gray-300 uppercase tracking-widest">No hay notificaciones pendientes</p>
                    </div>
                )}
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

export default Notifications;
