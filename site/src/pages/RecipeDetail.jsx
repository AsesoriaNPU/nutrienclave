import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, Flame, Star, ChevronRight, CheckCircle, ShoppingCart, Activity, MessageSquare, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const recipes = {
    '1': {
        id: '1',
        name: 'Salmón al vapor con Espárragos',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        time: '25 min',
        servings: 2,
        kcal: 380,
        rating: 4.8,
        tags: ['Alto en omega-3', 'Sin gluten', 'Rico en proteínas'],
        ingredients: [
            { amount: '350g', name: 'Lomo de salmón fresco', checked: false },
            { amount: '200g', name: 'Espárragos verdes', checked: false },
            { amount: '2 cdas', name: 'Aceite de oliva virgen extra', checked: false },
            { amount: '1', name: 'Limón y Cebollín', checked: false },
            { amount: '1 diente', name: 'Ajo', checked: false },
            { amount: 'Al gusto', name: 'Sal marina y pimienta negra', checked: false },
        ],
        steps: [
            'Lava bien los espárragos y retira la parte leñosa inferior.',
            'Sazona el salmón con sal, pimienta y unas gotas de limón.',
            'Coloca el salmón a 90°C durante 18-20 minutos hasta que esté tierno.',
            'En paralelo, saltea los espárragos con aceite de oliva durante 4 minutos.',
            'Sirve el salmón sobre los espárragos y decora con cebollín.',
        ],
        macros: {
            proteinas: '42g',
            grasas: '18g',
            carbohidratos: '6g',
            fibra: '3g',
        }
    },
    '2': {
        id: '2',
        name: 'Bowl de Quinoa con Verduras',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        time: '20 min',
        servings: 2,
        kcal: 320,
        rating: 4.6,
        tags: ['Vegano', 'Sin gluten', 'Alto en fibra'],
        ingredients: [
            { amount: '200g', name: 'Quinoa cocida', checked: false },
            { amount: '100g', name: 'Aguacate maduro', checked: false },
            { amount: '150g', name: 'Tomates cherry', checked: false },
            { amount: '80g', name: 'Espinacas baby', checked: false },
            { amount: '2 cdas', name: 'Tahini', checked: false },
        ],
        steps: [
            'Cocina la quinoa según las instrucciones del paquete.',
            'Corta el aguacate en láminas y los tomates por la mitad.',
            'Mezcla el tahini con limón y agua para hacer el aliño.',
            'Monta el bowl: quinoa, verduras y aliño por encima.',
        ],
        macros: {
            proteinas: '14g',
            grasas: '16g',
            carbohidratos: '38g',
            fibra: '8g',
        }
    }
};

const RecipeDetail = () => {
    const navigate = useNavigate();
    // Detect recipe from URL param, default to '1'
    const pathParts = window.location.pathname.split('/');
    const recipeId = pathParts[pathParts.length - 1] || '1';
    const recipe = recipes[recipeId] || recipes['1'];

    const [checkedIngredients, setCheckedIngredients] = useState(
        recipe.ingredients.map(() => false)
    );
    const [completedSteps, setCompletedSteps] = useState(
        recipe.steps.map(() => false)
    );

    const toggleIngredient = (i) => {
        setCheckedIngredients(prev => prev.map((v, idx) => idx === i ? !v : v));
    };

    const toggleStep = (i) => {
        setCompletedSteps(prev => prev.map((v, idx) => idx === i ? !v : v));
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
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white bg-opacity-90 flex items-center justify-center border-none cursor-pointer shadow-md"
                >
                    <ArrowLeft size={18} strokeWidth={1.5} />
                </button>
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
                    <h1 className="text-2xl font-extralight tracking-tight text-gray-800">{recipe.name}</h1>
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
                            <Star size={14} strokeWidth={1.5} fill="#76D14B" />
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
                            style={{ borderBottom: i < recipe.ingredients.length - 1 ? '1px solid #F1F5F9' : 'none' }}
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
                <Link to="/grocery-list"><ShoppingCart size={24} strokeWidth={1} color="#76D14B" /></Link>
                <Link to="/chat"><MessageSquare size={24} strokeWidth={1} color="#CBD5E1" /></Link>
                <Link to="/profile"><User size={24} strokeWidth={1} color="#CBD5E1" /></Link>
            </nav>
        </div>
    );
};

export default RecipeDetail;
