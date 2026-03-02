import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Clock, Flame, Star, ArrowLeft, Activity, ShoppingCart, MessageSquare, TrendingUp, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const allRecipes = [
    {
        id: '1',
        name: 'Salmón al vapor con Espárragos',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
        time: '25 min',
        kcal: 380,
        rating: 4.8,
        category: 'Proteína',
        tags: ['Sin gluten', 'Omega-3'],
    },
    {
        id: '2',
        name: 'Bowl de Quinoa con Verduras',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
        time: '20 min',
        kcal: 320,
        rating: 4.6,
        category: 'Vegano',
        tags: ['Sin gluten', 'Alto en fibra'],
    },
    {
        id: '3',
        name: 'Pollo con Cúrcuma y Verduras',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=80',
        time: '35 min',
        kcal: 420,
        rating: 4.7,
        category: 'Proteína',
        tags: ['Antiinflamatorio'],
    },
    {
        id: '4',
        name: 'Ensalada de Aguacate y Huevo',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
        time: '10 min',
        kcal: 280,
        rating: 4.5,
        category: 'Ligevero',
        tags: ['Keto', 'Rápido'],
    },
    {
        id: '5',
        name: 'Crema de Calabaza con Jengibre',
        image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=400&q=80',
        time: '30 min',
        kcal: 210,
        rating: 4.4,
        category: 'Vegano',
        tags: ['Antiinflamatorio', 'Digestivo'],
    },
    {
        id: '6',
        name: 'Trucha con Almendras y Limón',
        image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=80',
        time: '20 min',
        kcal: 340,
        rating: 4.9,
        category: 'Proteína',
        tags: ['Sin gluten', 'Omega-3'],
    },
];

const categories = ['Todo', 'Proteína', 'Vegano', 'Ligevero'];

const RecipeList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todo');

    const filtered = allRecipes.filter(r => {
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
                                        <div className="absolute top-2 right-2 bg-white bg-opacity-90 rounded-full px-2 py-1 flex items-center gap-1">
                                            <Star size={10} color="#76D14B" fill="#76D14B" />
                                            <span style={{ fontSize: '0.65rem' }} className="font-medium text-gray-700">{recipe.rating}</span>
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
