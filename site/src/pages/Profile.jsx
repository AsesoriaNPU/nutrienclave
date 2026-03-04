import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Smartphone, LogOut, ArrowLeft, ChevronRight, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';
import { SafeStorage } from '../utils/SafeStorage';

const Profile = () => {
    const navigate = useNavigate();
    const { userProfile, updateProfile } = useNutri();

    const handleLogout = () => {
        SafeStorage.clear();
        window.location.href = '/'; // Reset everything
    };

    const sections = [
        { icon: <Smartphone size={18} strokeWidth={1} />, title: 'Dispositivos Vinculados', subtitle: 'Apple Watch, Oura Ring' },
        { icon: <Shield size={18} strokeWidth={1} />, title: 'Datos Clínicos', subtitle: 'Historial de biomarcadores' },
        { icon: <Settings size={18} strokeWidth={1} />, title: 'Preferencias de Enclave', subtitle: 'Notificaciones, Privacidad' },
    ];

    return (
        <div className="min-h-screen bg-zen-bg flex flex-col">
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <h2 className="text-sm font-light uppercase tracking-widest">Mi Perfil</h2>
            </header>

            <main className="flex-1 p-6 space-y-8 max-w-2xl mx-auto w-full">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary-soft flex items-center justify-center border border-primary border-opacity-20 shadow-sm relative" style={{ width: '96px', height: '96px' }}>
                        <User size={40} color="#76D14B" strokeWidth={1} />
                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
                            <Shield size={10} color="white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-light">{userProfile.name || 'Usuario del Enclave'}</h1>
                        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Nivel de Armonía 4</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="zen-card p-4 flex flex-col items-center text-center space-y-2 overflow-hidden">
                        <Mail size={16} color="#2563EB" strokeWidth={1} />
                        <div className="text-zen-label text-gray-400 truncate w-full">{userProfile.email || 'sin@email.com'}</div>
                    </div>
                    <div className="zen-card p-4 flex flex-col items-center text-center space-y-2">
                        <Phone size={16} color="#76D14B" strokeWidth={1} />
                        <div className="text-zen-label text-gray-400">Datos Protegidos</div>
                    </div>
                </div>

                <div className="space-y-3">
                    {sections.map((section, index) => {
                        let targetRoute = '/dashboard';
                        if (section.title === 'Preferencias de Enclave') targetRoute = '/settings';
                        if (section.title === 'Datos Clínicos') targetRoute = '/evolution';
                        if (section.title === 'Dispositivos Vinculados') targetRoute = '/settings';

                        return (
                            <motion.div
                                key={section.title}
                                onClick={() => navigate(targetRoute)}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-400 group-hover:text-primary transition-colors">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-light text-gray-700">{section.title}</div>
                                        <div className="text-zen-label text-gray-400">{section.subtitle}</div>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-gray-300" />
                            </motion.div>
                        )
                    })}
                </div>

                <button
                    onClick={handleLogout}
                    className="zen-pill-button w-full justify-center gap-2 mt-4 text-red-500 border border-red-100 hover:bg-red-50 transition-colors bg-white py-3"
                >
                    <LogOut size={16} strokeWidth={1} />
                    <span className="text-sm">Cerrar Sesión</span>
                </button>
            </main>
        </div>
    );
};

export default Profile;
