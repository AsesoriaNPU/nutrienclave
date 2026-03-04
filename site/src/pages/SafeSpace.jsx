import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Thermometer, Droplets, Wind, Save, Sparkles, Activity, ShoppingCart, MessageSquare, TrendingUp, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';

const SafeSpace = () => {
    const navigate = useNavigate();
    const { addEmotionalLog } = useNutri();
    const [hunger, setHunger] = useState(5);
    const [stress, setStress] = useState(5);
    const [anxiety, setAnxiety] = useState(5);
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        addEmotionalLog({ hunger, stress, anxiety });
        setSaved(true);
        // Reset saved state after a delay or navigate
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    const Slider = ({ label, value, onChange, icon: Icon, color }) => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Icon size={18} color={color} strokeWidth={1.5} />
                    <span className="text-sm font-light uppercase tracking-wider text-gray-500">{label}</span>
                </div>
                <span className="text-lg font-extralight text-primary">{value}</span>
            </div>
            <div className="relative pt-1">
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-400 bg-opacity-10 rounded-lg appearance-none cursor-pointer accent-primary"
                />
            </div>
            <div className="flex justify-between text-[10px] text-gray-300 uppercase tracking-tighter">
                <span>Bajo</span>
                <span>Óptimo</span>
                <span>Alto</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-zen-bg flex flex-col">
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <h2 className="text-sm font-light uppercase tracking-widest">Safe Space</h2>
            </header>

            <main className="flex-1 p-6 space-y-12 max-w-2xl mx-auto w-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h1 className="text-3xl font-extralight tracking-tight" style={{ color: 'var(--color-text)' }}>Sintonía Emocional</h1>
                    <p className="text-xs text-gray-400 font-light">Tus emociones impactan tu metabolismo. Regístralas para una IA más precisa.</p>
                </motion.div>

                <div className="space-y-10">
                    <Slider
                        label="Hambre"
                        value={hunger}
                        onChange={setHunger}
                        icon={Thermometer}
                        color="#76D14B"
                    />
                    <Slider
                        label="Estrés"
                        value={stress}
                        onChange={setStress}
                        icon={Wind}
                        color="#2563EB"
                    />
                    <Slider
                        label="Ansiedad"
                        value={anxiety}
                        onChange={setAnxiety}
                        icon={Droplets}
                        color="#F59E0B"
                    />
                </div>

                <div className="pt-8">
                    <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        disabled={saved}
                        className={`zen-pill-button primary w-full justify-center gap-3 py-4 transition-all duration-500 ${saved ? 'bg-primary bg-opacity-10 text-primary border-primary' : ''}`}
                    >
                        {saved ? (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-2"
                            >
                                <Sparkles size={18} />
                                <span>DATOS SINCRONIZADOS</span>
                            </motion.div>
                        ) : (
                            <>
                                <Save size={18} strokeWidth={1} />
                                <span>GUARDAR ESTADO</span>
                            </>
                        )}
                    </motion.button>
                </div>
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

export default SafeSpace;
