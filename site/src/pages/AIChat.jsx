import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';

const AIChat = () => {
    const navigate = useNavigate();
    const { userProfile } = useNutri();
    const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Experto';

    const [messages, setMessages] = useState([
        { id: 1, text: `Hola, ${firstName}. Soy tu asistente de NutriEnclave. ¿En qué puedo ayudarte hoy con tu armonía biológica?`, sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;

        const newUserMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages([...messages, newUserMessage]);
        setInput('');

        setTimeout(() => {
            const hasWeightGoal = userProfile.goals?.includes('weight');
            let responseText = "Entendido. Procesando tus biomarcadores recientes...";

            if (hasWeightGoal && input.toLowerCase().includes('comida')) {
                responseText = "Basado en tu objetivo de control de peso, te recomiendo una comida rica en fibra y proteína magra. ¿Te gustaría ver una receta?";
            }

            const botResponse = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-zen-bg flex flex-col">
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <div>
                    <h2 className="text-sm font-light uppercase tracking-widest">Asistente IA</h2>
                    <div className="flex items-center gap-1-5 mt-1">
                        <div className="rounded-full bg-primary" style={{ width: '6px', height: '6px' }}></div>
                        <span className="text-zen-label text-primary uppercase tracking-wide">En línea</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-6 overflow-y-auto space-y-6">
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-md flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`} style={{ maxWidth: '85%' }}>
                                <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-secondary-soft' : 'bg-primary-soft'}`} style={{ width: '32px', height: '32px' }}>
                                    {msg.sender === 'user' ? <User size={14} color="#2563EB" /> : <Bot size={14} color="#76D14B" />}
                                </div>
                                <div className={`zen-card p-4 text-sm font-light leading-relaxed ${msg.sender === 'user' ? 'bg-secondary-soft' : 'bg-white'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </main>

            <footer className="p-4 bg-white border-t border-gray-100 glass">
                <div className="max-w-2xl mx-auto flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Escribe tu consulta..."
                        className="flex-1 bg-transparent border-none py-2 text-sm font-light focus:outline-none placeholder-gray-300"
                    />
                    <button
                        onClick={sendMessage}
                        className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-md border-none cursor-pointer"
                        style={{ width: '40px', height: '40px' }}
                    >
                        <Send size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AIChat;
