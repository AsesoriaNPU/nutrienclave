export const onboardingData = {
    steps: [
        {
            id: 1,
            title: "¿Cuál es tu objetivo principal?",
            description: "Personalizaremos tu experiencia basándonos en tu meta.",
            options: [
                { id: 'weight', label: 'Perder Peso', icon: '⚖️' },
                { id: 'muscle', label: 'Ganar Músculo', icon: '💪' },
                { id: 'energy', label: 'Más Energía', icon: '⚡' },
                { id: 'habit', label: 'Comer Saludable', icon: '🥗' }
            ]
        },
        {
            id: 2,
            title: "Tus Datos Vitales",
            description: "Necesitamos estos datos para calcular tu metabolismo base.",
            fields: ['Edad', 'Peso (kg)', 'Altura (cm)', 'Género', 'Nivel de Actividad']
        },
        // ... more steps will be populated as I extract them from designs
    ]
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
