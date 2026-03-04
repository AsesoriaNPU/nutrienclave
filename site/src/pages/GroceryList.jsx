import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Plus,
    X,
    Trash2,
    Circle,
    CheckCircle2
} from 'lucide-react';
import { useNutri } from '../context/NutriContext';
import { groceryCategories } from '../data/mockData';

const GroceryList = () => {
    const navigate = useNavigate();
    const {
        groceryList,
        toggleGroceryItem,
        removeGroceryItem,
        addGroceryItem
    } = useNutri();

    const [newItemName, setNewItemName] = useState('');
    const [showAdd, setShowAdd] = useState(false);

    // Group items by category for the UI
    const categories = groceryCategories.map(cat => ({
        ...cat,
        items: groceryList.filter(item =>
            item.category.toLowerCase() === cat.id.toLowerCase() ||
            (cat.id === 'otros' && !groceryCategories.some(c => c.id.toLowerCase() === item.category.toLowerCase()))
        )
    }));

    const addItem = () => {
        const trimmedName = newItemName.trim();
        if (!trimmedName) return;
        addGroceryItem(trimmedName, 'otros');
        setNewItemName('');
        setShowAdd(false);
    };

    const totalItems = groceryList.length;
    const checkedItems = groceryList.filter(i => i.checked).length;
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
                                            className="zen-card p-4 flex items-center justify-between hover:bg-primary-very-soft transition-colors"
                                        >
                                            <div
                                                className="flex items-center gap-4 flex-1 cursor-pointer"
                                                onClick={() => toggleGroceryItem(item.id)}
                                            >
                                                {item.checked ? (
                                                    <CheckCircle2 size={18} className="text-primary" strokeWidth={1.5} />
                                                ) : (
                                                    <Circle size={18} className="text-gray-200" strokeWidth={1.5} />
                                                )}
                                                <span className={`text-sm font-light ${item.checked ? 'text-gray-300 line-through' : 'text-gray-700'}`}>
                                                    {item.name}
                                                </span>
                                            </div>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); removeGroceryItem(item.id); }}
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
                <div className="mt-3 w-full h-[1px] bg-gray-400 bg-opacity-10 relative">
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
