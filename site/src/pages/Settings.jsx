import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Moon, Shield, ChevronRight, Globe, Smartphone, Trash2, LogOut, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Toggle = ({ value, onChange }) => (
    <button
        onClick={() => onChange(!value)}
        className="relative cursor-pointer border-none bg-transparent p-0"
        style={{ width: 44, height: 24 }}
    >
        <div
            className="w-full h-full rounded-full transition-all"
            style={{ backgroundColor: value ? '#76D14B' : '#E2E8F0' }}
        />
        <div
            className="absolute top-1 rounded-full bg-white shadow-sm transition-all"
            style={{ width: 16, height: 16, left: value ? 'calc(100% - 20px)' : '4px' }}
        />
    </button>
);

const SettingRow = ({ icon: Icon, color = '#76D14B', label, sublabel, toggle, value, onChange, chevron, danger }) => (
    <div className={`flex items-center justify-between py-4 border-b border-gray-50 ${danger ? 'cursor-pointer' : ''}`}>
        <div className="flex items-center gap-4">
            <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: danger ? 'rgba(239,68,68,0.08)' : `${color}15` }}
            >
                <Icon size={17} color={danger ? '#EF4444' : color} strokeWidth={1.5} />
            </div>
            <div>
                <p className={`text-sm font-light ${danger ? 'text-red-400' : 'text-gray-700'}`}>{label}</p>
                {sublabel && <p className="text-zen-label text-gray-300 uppercase tracking-widest">{sublabel}</p>}
            </div>
        </div>
        {toggle && <Toggle value={value} onChange={onChange} />}
        {chevron && <ChevronRight size={15} color="#CBD5E1" />}
    </div>
);

const Settings = () => {
    const navigate = useNavigate();
    const [prefs, setPrefs] = useState({
        pushNotifications: true,
        mealReminders: true,
        hydrationAlerts: true,
        darkMode: false,
        biometrics: true,
        weeklyReport: true,
    });

    const set = key => val => setPrefs(p => ({ ...p, [key]: val }));

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/profile')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <h2 className="text-sm font-light uppercase tracking-widest">Configuración</h2>
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Perfil */}
                <section>
                    <p className="text-zen-label text-gray-300 uppercase tracking-widest mb-3">Cuenta</p>
                    <div className="zen-card px-4">
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <SettingRow icon={User} color="#2563EB" label="Editar perfil" sublabel="Nombre, objetivos, datos personales" chevron />
                        </Link>
                        <Link to="/profile" style={{ textDecoration: 'none' }}>
                            <SettingRow icon={Shield} color="#7C3AED" label="Privacidad y datos" sublabel="Gestiona tu información" chevron />
                        </Link>
                        <SettingRow icon={Globe} color="#0EA5E9" label="Idioma" sublabel="Español" chevron />
                    </div>
                </section>

                {/* Notificaciones */}
                <section>
                    <p className="text-zen-label text-gray-300 uppercase tracking-widest mb-3">Notificaciones</p>
                    <div className="zen-card px-4">
                        <SettingRow icon={Bell} color="#F59E0B" label="Notificaciones push" toggle value={prefs.pushNotifications} onChange={set('pushNotifications')} />
                        <SettingRow icon={Bell} color="#76D14B" label="Recordatorios de comida" sublabel="Desayuno, almuerzo y cena" toggle value={prefs.mealReminders} onChange={set('mealReminders')} />
                        <SettingRow icon={Bell} color="#0EA5E9" label="Alertas de hidratación" toggle value={prefs.hydrationAlerts} onChange={set('hydrationAlerts')} />
                        <SettingRow icon={Bell} color="#7C3AED" label="Informe semanal" sublabel="Cada lunes" toggle value={prefs.weeklyReport} onChange={set('weeklyReport')} />
                    </div>
                </section>

                {/* Preferencias */}
                <section>
                    <p className="text-zen-label text-gray-300 uppercase tracking-widest mb-3">Preferencias</p>
                    <div className="zen-card px-4">
                        <SettingRow icon={Moon} color="#7C3AED" label="Modo oscuro" toggle value={prefs.darkMode} onChange={set('darkMode')} />
                        <SettingRow icon={Smartphone} color="#10B981" label="Autenticación biométrica" toggle value={prefs.biometrics} onChange={set('biometrics')} />
                    </div>
                </section>

                {/* Zona peligrosa */}
                <section>
                    <p className="text-zen-label text-gray-300 uppercase tracking-widest mb-3">Sesión</p>
                    <div className="zen-card px-4">
                        <SettingRow icon={LogOut} label="Cerrar sesión" danger chevron />
                        <SettingRow icon={Trash2} label="Eliminar cuenta" sublabel="Acción irreversible" danger chevron />
                    </div>
                </section>

                <p className="text-center text-zen-label text-gray-200 uppercase tracking-widest">NutriEnclave v1.0 · Enclave Natural™</p>
            </main>
        </div>
    );
};

export default Settings;
