import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Thermometer, Droplets, Wind, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
        setTimeout(() => navigate('/dashboard'), 1500);
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
            <input
                type="range"
                min="1"
                max="10"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
            />
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
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extralight tracking-tight text-gray-800">Sintonía Emocional</h1>
                    <p className="text-xs text-gray-400 font-light">Tus emociones impactan tu metabolismo. Regístralas para una IA más precisa.</p>
                </div>

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
                    <button
                        onClick={handleSave}
                        disabled={saved}
                        className={`zen-pill-button primary w-full justify-center gap-3 py-4 ${saved ? 'bg-primary-soft text-primary' : ''}`}
                    >
                        {saved ? 'DATOS SINCRONIZADOS' : (
                            <>
                                <Save size={18} strokeWidth={1} />
                                <span>GUARDAR ESTADO</span>
                            </>
                        )}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SafeSpace;
