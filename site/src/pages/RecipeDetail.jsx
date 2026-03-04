import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Flame, Star, ChevronRight, CheckCircle, ShoppingCart, Activity, MessageSquare, User } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useNutri } from '../context/NutriContext';
import { recipes as allRecipes } from '../data/mockData';

const RecipeDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { favorites, toggleFavorite, addToGroceryList } = useNutri();
    const recipe = allRecipes.find(r => r.id === id) || allRecipes[0];

    const [checkedIngredients, setCheckedIngredients] = useState(
        recipe.ingredients.map(() => false)
    );
    const [completedSteps, setCompletedSteps] = useState(
        recipe.steps.map(() => false)
    );
    const [addingToList, setAddingToList] = useState(false);

    const toggleIngredient = (i) => {
        setCheckedIngredients(prev => prev.map((v, idx) => idx === i ? !v : v));
    };

    const toggleStep = (i) => {
        setCompletedSteps(prev => prev.map((v, idx) => idx === i ? !v : v));
    };

    const handleAddIngredients = () => {
        addToGroceryList(recipe.ingredients);
        setAddingToList(true);
        setTimeout(() => setAddingToList(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zen-bg pb-24">
            {/* Hero Image */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)' }} />
                <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 rounded-full glass flex items-center justify-center border-none cursor-pointer shadow-md text-gray-700"
                    >
                        <ArrowLeft size={18} strokeWidth={1.5} />
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleAddIngredients}
                            className={`w-10 h-10 rounded-full glass flex items-center justify-center border-none cursor-pointer shadow-md transition-all ${addingToList ? 'text-primary' : 'text-gray-400'}`}
                        >
                            <ShoppingCart size={18} strokeWidth={1.5} />
                        </button>
                        <button
                            onClick={() => toggleFavorite(recipe.id)}
                            className="w-10 h-10 rounded-full glass flex items-center justify-center border-none cursor-pointer shadow-md text-primary"
                        >
                            <Star size={18} fill={Array.isArray(favorites) && favorites.includes(recipe.id) ? "#059669" : "transparent"} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex gap-2 flex-wrap mb-2">
                        {recipe.tags.map(tag => (
                            <span key={tag} className="text-zen-label text-white bg-white bg-opacity-20 px-3 py-1 rounded-full border border-white border-opacity-30 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <main className="p-6 space-y-6 max-w-2xl mx-auto">
                {/* Title and meta */}
                <div>
                    <h1 className="text-2xl font-extralight tracking-tight" style={{ color: 'var(--color-text)' }}>{recipe.name}</h1>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Clock size={14} strokeWidth={1.5} />
                            <span className="text-sm font-light">{recipe.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Users size={14} strokeWidth={1.5} />
                            <span className="text-sm font-light">{recipe.servings} personas</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400">
                            <Flame size={14} strokeWidth={1.5} />
                            <span className="text-sm font-light">{recipe.kcal} kcal</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-primary">
                            <Star size={14} strokeWidth={1.5} fill="#059669" />
                            <span className="text-sm font-light">{recipe.rating}</span>
                        </div>
                    </div>
                </div>

                {/* Macros */}
                <div className="zen-card p-4">
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3">Perfil Nutricional</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                        {Object.entries(recipe.macros).map(([key, val]) => (
                            <div key={key} className="space-y-1">
                                <div className="text-lg font-extralight text-primary">{val}</div>
                                <div className="text-zen-label text-gray-400 uppercase tracking-widest capitalize">{key}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Ingredients */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="zen-card p-4 space-y-3"
                >
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest">Ingredientes</h3>
                    {recipe.ingredients.map((ing, i) => (
                        <button
                            key={i}
                            onClick={() => toggleIngredient(i)}
                            className="w-full flex items-center gap-3 py-2 border-none bg-transparent cursor-pointer text-left"
                            style={{ borderBottom: i < recipe.ingredients.length - 1 ? '1px solid var(--color-border)' : 'none' }}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${checkedIngredients[i]
                                ? 'border-primary bg-primary'
                                : 'border-gray-200 bg-transparent'
                                }`}>
                                {checkedIngredients[i] && <CheckCircle size={12} color="white" strokeWidth={2} />}
                            </div>
                            <span className="text-gray-500 text-sm font-light w-12 flex-shrink-0">{ing.amount}</span>
                            <span className={`text-sm font-light transition-all ${checkedIngredients[i] ? 'text-gray-300 line-through' : 'text-gray-700'
                                }`}>{ing.name}</span>
                        </button>
                    ))}
                </motion.div>

                {/* Preparation Steps */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="zen-card p-4 space-y-4"
                >
                    <h3 className="text-xs text-gray-400 uppercase tracking-widest">Preparación</h3>
                    {recipe.steps.map((step, i) => (
                        <button
                            key={i}
                            onClick={() => toggleStep(i)}
                            className="w-full flex items-start gap-4 py-2 border-none bg-transparent cursor-pointer text-left"
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-medium transition-all border ${completedSteps[i]
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white border-gray-200 text-gray-400'
                                }`}>
                                {completedSteps[i] ? '✓' : i + 1}
                            </div>
                            <p className={`text-sm font-light leading-relaxed pt-1 transition-all ${completedSteps[i] ? 'text-gray-300 line-through' : 'text-gray-700'
                                }`}>{step}</p>
                        </button>
                    ))}
                </motion.div>

                {/* AI Recommendation */}
                <div className="bg-primary-very-soft p-4 rounded-xl border border-primary border-opacity-20">
                    <p className="text-xs italic font-light leading-relaxed text-gray-700">
                        "Esta receta está optimizada para tu perfil. El omega-3 del salmón favorece la regulación de tu ritmo circadiano según tus últimos biomarcadores."
                    </p>
                    <p className="text-zen-label text-primary uppercase tracking-widest mt-2">— NutriEnclave IA</p>
                </div>
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 p-4 bg-white glass border-t border-gray-100 flex justify-around items-center">
                <Link to="/dashboard"><Activity size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#059669" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default RecipeDetail;
