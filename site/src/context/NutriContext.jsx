import React, { createContext, useContext, useState, useEffect } from 'react';

const NutriContext = createContext();

export const NutriProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(() => {
        const saved = localStorage.getItem('nutri_profile');
        return saved ? JSON.parse(saved) : {
            name: "",
            email: "",
            goals: [],
            age: null,
            weight: null,
            height: null,
            activityLevel: null,
            emotionalState: [],
        };
    });

    useEffect(() => {
        localStorage.setItem('nutri_profile', JSON.stringify(userProfile));
    }, [userProfile]);

    const updateProfile = (newData) => {
        setUserProfile(prev => ({ ...prev, ...newData }));
    };

    const addEmotionalLog = (log) => {
        setUserProfile(prev => ({
            ...prev,
            emotionalState: [...prev.emotionalState, { ...log, timestamp: new Date() }]
        }));
    };

    return (
        <NutriContext.Provider value={{ userProfile, updateProfile, addEmotionalLog }}>
            {children}
        </NutriContext.Provider>
    );
};

export const useNutri = () => {
    const context = useContext(NutriContext);
    if (!context) {
        throw new Error('useNutri must be used within a NutriProvider');
    }
    return context;
};
