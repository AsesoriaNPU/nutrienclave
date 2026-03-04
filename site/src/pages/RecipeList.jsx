import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Star, Clock, Flame, Activity, ShoppingCart, MessageSquare, TrendingUp, User } from 'lucide-react';
import { useNutri } from '../context/NutriContext';
import { recipes } from '../data/mockData';

const categories = ['Todo', 'Proteína', 'Vegano', 'Ligero'];

const RecipeList = () => {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useNutri();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todo');

    const filtered = recipes.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === 'Todo' || r.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Header */}
            <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 border-none bg-transparent cursor-pointer"
                    >
                        <ArrowLeft size={20} strokeWidth={1} />
                    </button>
                    <h2 className="text-sm font-light uppercase tracking-widest">Recetas Enclave</h2>
                </div>
                {/* Search bar */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <Search size={16} color="#94A3B8" strokeWidth={1.5} />
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar recetas..."
                        className="flex-1 bg-transparent border-none text-sm font-light focus:outline-none placeholder-gray-300"
                    />
                </div>
            </header>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Category filters */}
                <div className="flex gap-2 overflow-x-auto" style={{ paddingBottom: '4px' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium border transition-all cursor-pointer ${activeCategory === cat
                                ? 'bg-primary text-white border-primary'
                                : 'bg-white text-gray-400 border-gray-200 hover:border-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p className="text-zen-label text-gray-400 uppercase tracking-widest">
                    {filtered.length} recetas
                </p>

                {/* Recipe Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {filtered.map((recipe, i) => (
                        <motion.div
                            key={recipe.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Link to={`/recipe/${recipe.id}`} style={{ textDecoration: 'none' }}>
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
                                    <div className="relative" style={{ height: '130px' }}>
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="w-full h-full"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="absolute top-2 right-2 flex flex-col gap-2">
                                            <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1">
                                                <Star size={10} color="#76D14B" fill="#76D14B" />
                                                <span style={{ fontSize: '0.65rem' }} className="font-medium text-gray-700">{recipe.rating}</span>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    toggleFavorite(recipe.id);
                                                }}
                                                className="w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center border-none cursor-pointer shadow-sm text-primary"
                                            >
                                                <Star size={14} fill={Array.isArray(favorites) && favorites.includes(recipe.id) ? "#76D14B" : "transparent"} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3 space-y-2">
                                        <p className="text-sm font-light text-gray-800 leading-tight">{recipe.name}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1 text-gray-400">
                                                <Clock size={11} strokeWidth={1.5} />
                                                <span style={{ fontSize: '0.65rem' }}>{recipe.time}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-primary">
                                                <Flame size={11} strokeWidth={1.5} />
                                                <span style={{ fontSize: '0.65rem' }}>{recipe.kcal} kcal</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#76D14B" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/evolution"><TrendingUp size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default RecipeList;
