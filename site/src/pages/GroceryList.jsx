import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, CheckCircle2, Circle, ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GroceryList = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(() => {
        const saved = localStorage.getItem('nutri_grocery');
        return saved ? JSON.parse(saved) : [
            {
                name: 'Bio-Activos & Vegetales',
                items: [
                    { id: 1, name: 'Espinacas Baby Orgánicas', checked: false },
                    { id: 2, name: 'Arándanos Silvestres', checked: true },
                    { id: 3, name: 'Aguacate Hass', checked: false }
                ]
            },
            {
                name: 'Proteína de Alta Disponibilidad',
                items: [
                    { id: 4, name: 'Salmón Salvaje', checked: false },
                    { id: 5, name: 'Huevos de Pastoreo', checked: false }
                ]
            }
        ];
    });

    const [newItemName, setNewItemName] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    useEffect(() => {
        localStorage.setItem('nutri_grocery', JSON.stringify(categories));
    }, [categories]);

    const toggleItem = (catIndex, itemIndex) => {
        const newCats = [...categories];
        newCats[catIndex].items[itemIndex].checked = !newCats[catIndex].items[itemIndex].checked;
        setCategories(newCats);
    };

    const removeItem = (catIndex, itemId) => {
        const newCats = [...categories];
        newCats[catIndex].items = newCats[catIndex].items.filter(item => item.id !== itemId);
        setCategories(newCats);
    };

    const addItem = () => {
        if (!newItemName.trim()) return;
        const newCats = [...categories];
        // For simplicity, add to first category
        newCats[0].items.push({ id: Date.now(), name: newItemName, checked: false });
        setCategories(newCats);
        setNewItemName('');
        setShowAdd(false);
    };

    const totalItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);
    const checkedItems = categories.reduce((acc, cat) => acc + cat.items.filter(i => i.checked).length, 0);
    const progress = totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);

    return (
        <div className="min-h-screen bg-zen-bg flex flex-col">
            <header className="p-6 bg-white flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard')} className="text-gray-400 border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <h2 className="text-sm font-light uppercase tracking-widest">Lista de la Compra</h2>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="text-primary border-none bg-transparent cursor-pointer"
                >
                    {showAdd ? <X size={20} strokeWidth={1} /> : <Plus size={20} strokeWidth={1} />}
                </button>
            </header>

            <main className="flex-1 p-6 space-y-8 max-w-2xl mx-auto w-full">
                <AnimatePresence>
                    {showAdd && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="zen-card p-4 flex gap-2">
                                <input
                                    type="text"
                                    value={newItemName}
                                    onChange={(e) => setNewItemName(e.target.value)}
                                    placeholder="Nuevo alimento..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-sm font-light"
                                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                                />
                                <button
                                    onClick={addItem}
                                    className="text-primary text-xs uppercase tracking-widest font-medium"
                                >
                                    Añadir
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {categories.map((category, catIndex) => (
                    category.items.length > 0 && (
                        <section key={category.name} className="space-y-4">
                            <h3 className="text-zen-label uppercase tracking-widest text-gray-400 font-medium px-2">
                                {category.name}
                            </h3>
                            <div className="space-y-2">
                                <AnimatePresence>
                                    {category.items.map((item, itemIndex) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="zen-card p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div
                                                className="flex items-center gap-4 flex-1 cursor-pointer"
                                                onClick={() => toggleItem(catIndex, itemIndex)}
                                            >
                                                {item.checked ? (
                                                    <CheckCircle2 size={18} color="#76D14B" strokeWidth={1.5} />
                                                ) : (
                                                    <Circle size={18} color="#E2E8F0" strokeWidth={1.5} />
                                                )}
                                                <span className={`text-sm font-light ${item.checked ? 'text-gray-300 line-through' : 'text-gray-700'}`}>
                                                    {item.name}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeItem(catIndex, item.id); }}
                                                className="text-gray-300 hover:text-red-400 transition-colors border-none bg-transparent cursor-pointer p-1"
                                            >
                                                <Trash2 size={14} strokeWidth={1} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </section>
                    )
                ))}
            </main>

            <footer className="p-6 bg-white border-t border-gray-100 sticky bottom-0 z-10 glass">
                <div className="flex justify-between items-center text-xs uppercase tracking-widest text-gray-400 font-light">
                    <span>Progreso del Enclave</span>
                    <span className="text-primary font-medium">{progress}%</span>
                </div>
                <div className="mt-3 w-full h-[1px] bg-gray-100 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="absolute h-full bg-primary"
                    />
                </div>
            </footer>
        </div>
    );
};

export default GroceryList;
