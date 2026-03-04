export const onboardingData = {
    steps: [
        {
            id: 1,
            title: "Tu Consejero Privado",
            description: "Ciencia y precisión en la palma de tu mano. Tu IA analiza cada biomarcador para guiarte.",
            icon: 'sparkles'
        },
        {
            id: 2,
            title: "Sincronía Vital",
            description: "Tus dispositivos alimentan tu Enclave. Sigue tu ritmo cardíaco, sueño y actividad en tiempo real.",
            icon: 'watch'
        },
        {
            id: 3,
            title: "Tus Datos Vitales",
            description: "Calcularemos tu metabolismo base para personalizar tu plan.",
            fields: [
                { id: 'age', label: 'Edad', type: 'number', placeholder: '25' },
                { id: 'weight', label: 'Peso (kg)', type: 'number', placeholder: '70' },
                { id: 'height', label: 'Altura (cm)', type: 'number', placeholder: '175' }
            ]
        },
        {
            id: 4,
            title: "Define tu Enclave",
            description: "¿Cuál es tu prioridad hoy?",
            options: [
                { id: 'weight', label: 'Control de Peso', icon: 'Target' },
                { id: 'energy', label: 'Energía Vital', icon: 'Zap' },
                { id: 'muscle', label: 'Rendimiento', icon: 'Waves' },
                { id: 'mental', label: 'Focus Mental', icon: 'Brain' }
            ]
        },
        {
            id: 5,
            title: "Casi allí",
            description: "Completa tu perfil para una precisión máxima.",
            fields: [
                { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Ej. Angel Benito' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'tu@email.com' }
            ]
        }
    ]
};

export const healthStats = {
    water: { current: 1.5, goal: 2.5, unit: 'L' },
    steps: { current: 8432, goal: 10000, unit: 'pasos' },
    calories: { current: 1450, goal: 2100, unit: 'kcal' },
    sleep: { current: 7, goal: 8, unit: 'h' }
};

export const defaultDailyStats = {
    calories: { current: 0, goal: 2100 },
    water: { current: 0, goal: 2.5 },
    steps: { current: 0, goal: 10000 },
    sleep: { current: 0, goal: 8 }
};

export const dashboardData = {
    user: "Ángel",
    stats: {
        calories: { current: 1450, goal: 2100 },
        water: { current: 1.5, goal: 2.5 },
        steps: { current: 8432, goal: 10000 },
        sleep: { current: 7, goal: 8 }
    },
    emotionalState: {
        lastHunger: 4,
        lastAnxiety: 2,
        trend: "Baja"
    }
};

export const recipes = [
    {
        id: '1',
        name: 'Salmón al vapor con Espárragos',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80',
        time: '25 min',
        servings: 2,
        kcal: 380,
        rating: 4.8,
        category: 'Proteína',
        tags: ['Alto en omega-3', 'Sin gluten', 'Rico en proteínas'],
        ingredients: [
            { amount: '350g', name: 'Lomo de salmón fresco', category: 'proteina' },
            { amount: '200g', name: 'Espárragos verdes', category: 'vegetales' },
            { amount: '2 cdas', name: 'Aceite de oliva virgen extra', category: 'despensa' },
            { amount: '1', name: 'Limón y Cebollín', category: 'vegetales' },
            { amount: '1 diente', name: 'Ajo', category: 'vegetales' },
        ],
        steps: [
            'Lava bien los espárragos y retira la parte leñosa inferior.',
            'Sazona el salmón con sal, pimienta y unas gotas de limón.',
            'Coloca el salmón a 90°C durante 18-20 minutos hasta que esté tierno.',
            'En paralelo, saltea los espárragos con aceite de oliva durante 4 minutos.',
            'Sirve el salmón sobre los espárragos y decora con cebollín.',
        ],
        macros: { proteinas: '42g', grasas: '18g', carbohidratos: '6g', fibra: '3g' }
    },
    {
        id: '2',
        name: 'Bowl de Quinoa con Verduras',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        time: '20 min',
        servings: 2,
        kcal: 320,
        rating: 4.6,
        category: 'Vegano',
        tags: ['Vegano', 'Sin gluten', 'Alto en fibra'],
        ingredients: [
            { amount: '200g', name: 'Quinoa cocida', category: 'granos' },
            { amount: '100g', name: 'Aguacate maduro', category: 'vegetales' },
            { amount: '150g', name: 'Tomates cherry', category: 'vegetales' },
            { amount: '80g', name: 'Espinacas baby', category: 'vegetales' },
            { amount: '2 cdas', name: 'Tahini', category: 'despensa' },
        ],
        steps: [
            'Cocina la quinoa según las instrucciones del paquete.',
            'Corta el aguacate en láminas y los tomates por la mitad.',
            'Mezcla el tahini con limón y agua para hacer el aliño.',
            'Monta el bowl: quinoa, verduras y aliño por encima.',
        ],
        macros: { proteinas: '14g', grasas: '16g', carbohidratos: '38g', fibra: '8g' }
    },
    {
        id: '3',
        name: 'Pollo con Cúrcuma y Verduras',
        image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=800&q=80',
        time: '35 min',
        servings: 2,
        kcal: 420,
        rating: 4.7,
        category: 'Proteína',
        tags: ['Antiinflamatorio', 'Alto en proteínas', 'Sin gluten'],
        ingredients: [
            { amount: '400g', name: 'Pechuga de pollo', category: 'proteina' },
            { amount: '1 cdta', name: 'Cúrcuma en polvo', category: 'despensa' },
            { amount: '1 cdta', name: 'Jengibre rallado', category: 'vegetales' },
            { amount: '200g', name: 'Brócoli', category: 'vegetales' },
            { amount: '1', name: 'Pimiento rojo', category: 'vegetales' },
        ],
        steps: [
            'Corta el pollo en tiras y marina con cúrcuma, jengibre, sal y pimienta 10 minutos.',
            'Corta el brócoli en ramilletes y el pimiento en tiras.',
            'Calienta el aceite en una sartén a fuego medio-alto.',
            'Saltea el pollo 6-7 minutos hasta que esté dorado.',
            'Añade las verduras y saltea 4 minutos más manteniendo el crujiente.',
        ],
        macros: { proteinas: '48g', grasas: '14g', carbohidratos: '12g', fibra: '5g' }
    },
    {
        id: '4',
        name: 'Ensalada de Aguacate y Huevo',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
        time: '10 min',
        servings: 1,
        kcal: 280,
        rating: 4.5,
        category: 'Ligero',
        tags: ['Keto', 'Rápido', 'Sin gluten'],
        ingredients: [
            { amount: '1', name: 'Aguacate maduro', category: 'vegetales' },
            { amount: '2', name: 'Huevos cocidos', category: 'proteina' },
            { amount: '80g', name: 'Mezcla de hojas verdes', category: 'vegetales' },
            { amount: '10', name: 'Tomates cherry', category: 'vegetales' },
        ],
        steps: [
            'Cuece los huevos 8 minutos, enfría en agua fría y pela.',
            'Corta el aguacate en láminas y los tomates cherry por la mitad.',
            'Aliña con aceite, limón, sal y pimienta al gusto.',
        ],
        macros: { proteinas: '18g', grasas: '22g', carbohidratos: '8g', fibra: '6g' }
    }
];

export const groceryCategories = [
    { id: 'vegetales', name: 'Vegetales y Frutas' },
    { id: 'proteina', name: 'Proteínas' },
    { id: 'despensa', name: 'Despensa y Especias' },
    { id: 'granos', name: 'Granos y Cereales' },
    { id: 'otros', name: 'Otros' }
];

export const mealPlans = [
    {
        day: "Lunes",
        meals: [
            { id: 1, type: "Desayuno", name: "Avena con Frutos Rojos", calories: 350, emotionalNote: "Ideal para energía sostenida" },
            { id: 2, type: "Almuerzo", name: "Ensalada de Pollo y Quinoa", calories: 550, emotionalNote: "Ligero y saciante" },
            { id: 3, type: "Cena", name: "Salmón al Horno con Espárragos", calories: 450, emotionalNote: "Rico en Omega-3 para el descanso" }
        ]
    }
];

export const initialAchievements = [
    {
        id: 'streak-7', icon: 'Flame', color: '#F59E0B',
        title: 'Racha de 7 días', subtitle: 'Completa tu plan 7 días seguidos',
        unlocked: false, progress: 0, xp: 150,
        current: 0, target: 7, category: 'racha'
    },
    {
        id: 'water-goal', icon: 'Droplets', color: '#0EA5E9',
        title: 'Hidratación perfecta', subtitle: 'Bebe 2.5L durante 5 días',
        unlocked: false, progress: 0, xp: 80,
        current: 0, target: 5, category: 'hidratacion'
    },
    {
        id: 'bio-score-90', icon: 'Star', color: '#059669',
        title: 'Bio-Score 90+', subtitle: 'Alcanza un Bio-Enclave Score superior a 90',
        unlocked: false, progress: 0, xp: 200,
        current: 0, target: 90, category: 'score'
    },
    {
        id: 'sleep-consistent', icon: 'Moon', color: '#7C3AED',
        title: 'Ritmo Circadiano', subtitle: 'Mantén horarios de sueño consistentes 7 días',
        unlocked: false, progress: 0, xp: 120,
        current: 0, target: 7, category: 'sueño'
    },
    {
        id: 'month-green', icon: 'Leaf', color: '#10B981',
        title: 'Mes Verde', subtitle: 'Completa el plan nutricional durante 30 días',
        unlocked: false, progress: 0, xp: 500,
        current: 0, target: 30, category: 'nutricion'
    }
];

export const initialNotifications = [
    {
        id: 1,
        type: 'ai',
        icon: 'TrendingUp',
        color: '#059669',
        title: 'Bienvenido al Enclave',
        body: 'Tu sistema biológico está listo para ser optimizado. Empieza registrando tu hidratación.',
        time: 'Ahora',
        read: false,
    }
];

export const defaultSettings = {
    pushNotifications: true,
    mealReminders: true,
    hydrationAlerts: true,
    biometrics: true,
    weeklyReport: true,
};
