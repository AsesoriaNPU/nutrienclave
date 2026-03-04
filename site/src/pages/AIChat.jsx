import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, ArrowLeft, Lightbulb, TrendingUp, Utensils, Droplets, Activity, ShoppingCart, MessageSquare } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';
import { recipes } from '../data/mockData';

const AIChat = () => {
    const navigate = useNavigate();
    const { userProfile, dailyStats, calculateBioScore, chatHistory, setChatHistory } = useNutri();
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Experto';

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isTyping]);

    const quickActions = [
        { label: '¿Qué como hoy?', icon: Utensils, query: 'recomiendame una receta para hoy' },
        { label: 'Mi Score', icon: TrendingUp, query: 'cómo va mi bio-score' },
        { label: 'Hidratación', icon: Droplets, query: 'necesito beber más agua?' },
        { label: 'Consejo Zen', icon: Lightbulb, query: 'estoy un poco estresado' },
    ];

    const generateAIResponse = (userQuery) => {
        const query = userQuery.toLowerCase();
        let response = "";

        // 1. Goal-based Recipe Suggestions
        if (query.includes('como') || query.includes('receta') || query.includes('cena') || query.includes('comida')) {
            const goal = userProfile.goals && userProfile.goals[0];
            let filteredRecipes = recipes;

            if (goal === 'muscle') {
                response = "Para potenciar tu desarrollo muscular, necesitas proteína de alta calidad. ";
                filteredRecipes = recipes.filter(r => r.category === 'Proteína' || r.kcal > 400);
            } else if (goal === 'weight') {
                response = "Para tu objetivo de control de peso, te sugiero algo ligero y saciante. ";
                filteredRecipes = recipes.filter(r => r.kcal < 350);
            } else {
                response = "Aquí tienes una recomendación equilibrada para hoy: ";
            }

            const recipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)] || recipes[0];
            response += `Te recomiendo preparar **${recipe.name}** (${recipe.kcal} kcal). Tiene un gran aporte de ${Object.keys(recipe.macros)[0]}. ¿Quieres que te la añada a favoritos?`;
        }

        // 2. Score Analysis
        else if (query.includes('score') || query.includes('progreso')) {
            const score = calculateBioScore(userProfile, dailyStats);
            if (score >= 85) {
                response = `Tu Bio-Enclave Score actual es de **${score}**. Estás en una zona de alto rendimiento biológico. ¡Sigue con esa disciplina!`;
            } else {
                response = `Tu Score de **${score}** tiene margen de mejora. Si registras tu hidratación o completas tus pasos diarios, veremos una subida inmediata.`;
            }
        }

        // 3. Hydration Check
        else if (query.includes('agua') || query.includes('hidratacion')) {
            const water = dailyStats.water.current;
            const goal = dailyStats.water.goal;
            if (water < goal * 0.5) {
                response = `Llevas **${water}L** de agua hoy. Estás por debajo del 50% de tu objetivo. Bebe un vaso ahora mismo, tu enfoque mental lo notará en 10 minutos.`;
            } else {
                response = `¡Buen trabajo! Has bebido **${water}L**. Estás muy cerca de tu objetivo óptimo de hidratación.`;
            }
        }

        // 4. Emotional Context (Safe Space analysis)
        else if (query.includes('estres') || query.includes('ansiedad') || query.includes('cansado')) {
            const lastLog = userProfile.emotionalState?.slice(-1)[0];
            if (lastLog && lastLog.stress > 60) {
                response = "He notado que tus niveles de estrés en Safe Space han sido altos. Te sugiero evitar la cafeína extra y priorizar alimentos ricos en triptófano y magnesio como el aguacate o frutos secos.";
            } else {
                response = "Entiendo. Un pequeño paseo de 10 minutos o una hidratación profunda pueden bajar tus niveles de cortisol. ¿Te gustaría que busquemos una receta reconfortante?";
            }
        }

        // 5. Default
        else {
            response = `Interesante consulta, ${firstName}. Analizando tus biomarcadores: hoy has cubierto el ${Math.round(dailyStats.calories.current / dailyStats.calories.goal * 100)}% de tus calorías. ¿En qué más puedo profundizar?`;
        }

        return response;
    };

    const handleSend = (text = input) => {
        let msgText = typeof text === 'string' ? text : input;

        // Basic Sanitization: Trim and remove potentially malicious characters if necessary
        msgText = msgText.trim().replace(/[<>]/g, "");

        if (!msgText) return;

        const newUserMessage = {
            id: Date.now(),
            text: msgText,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        setChatHistory(prev => [...prev, newUserMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const aiText = generateAIResponse(msgText);
            const botResponse = {
                id: Date.now() + 1,
                text: aiText,
                sender: 'bot',
                timestamp: new Date().toISOString()
            };
            setChatHistory(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-zen-bg flex flex-col h-screen overflow-hidden">
            <header className="p-6 bg-white flex items-center gap-4 border-b border-gray-100 sticky top-0 z-10 flex-shrink-0">
                <button onClick={() => navigate('/dashboard')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                    <ArrowLeft size={20} strokeWidth={1} />
                </button>
                <div>
                    <h2 className="text-sm font-light uppercase tracking-widest">Enclave IA</h2>
                    <div className="flex items-center gap-1.5 mt-1">
                        <div className="rounded-full bg-primary" style={{ width: '6px', height: '6px' }}></div>
                        <span className="text-[10px] text-primary uppercase tracking-widest font-medium">Sincronizado</span>
                    </div>
                </div>
            </header>

            <main
                ref={scrollRef}
                className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
            >
                <AnimatePresence>
                    {chatHistory.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-md flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`} style={{ maxWidth: '85%' }}>
                                <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-secondary-soft' : 'bg-primary-soft'}`} style={{ width: '32px', height: '32px' }}>
                                    {msg.sender === 'user' ? <User size={14} className="text-secondary" /> : <Bot size={14} className="text-primary" />}
                                </div>
                                <div className={`zen-card p-4 text-sm font-light leading-relaxed ${msg.sender === 'user' ? 'bg-secondary-soft border-secondary border-opacity-10' : 'bg-white'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                        >
                            <div className="flex gap-3 items-center ml-11">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                            className="w-1 h-1 bg-primary rounded-full"
                                        />
                                    ))}
                                </div>
                                <span className="text-[10px] text-gray-300 uppercase tracking-widest">IA analizando biomarcadores</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <footer className="p-4 bg-white border-t border-gray-100 flex-shrink-0">
                {/* Quick Action Pills */}
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(action.query)}
                            className="whitespace-nowrap flex items-center gap-2 px-4 py-2 bg-zen-bg border border-gray-100 border-opacity-30 rounded-full text-[10px] uppercase tracking-widest text-gray-400 hover:bg-primary-soft hover:text-primary hover:border-primary transition-all cursor-pointer"
                        >
                            <action.icon size={12} strokeWidth={1.5} />
                            {action.label}
                        </button>
                    ))}
                </div>

                <div className="max-w-2xl mx-auto flex gap-3 items-center bg-zen-bg rounded-full px-4 border border-gray-100 border-opacity-30 focus-within:border-primary transition-colors">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribre sobre tu nutrición..."
                        className="flex-1 bg-transparent border-none py-3 text-sm font-light focus:outline-none placeholder-gray-400 text-gray-700"
                    />
                    <button
                        onClick={() => handleSend()}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border-none cursor-pointer ${input.trim() ? 'bg-primary text-white' : 'bg-gray-100 bg-opacity-10 text-gray-400'}`}
                    >
                        <Send size={14} strokeWidth={2} />
                    </button>
                </div>
            </footer>

            {/* Bottom Nav */}
            <nav className="p-4 bg-white glass border-t border-gray-100 flex justify-around items-center flex-shrink-0">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#059669" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default AIChat;
