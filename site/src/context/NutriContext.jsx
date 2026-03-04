import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { defaultDailyStats, initialAchievements, initialNotifications, defaultSettings } from '../data/mockData';
import { SafeStorage } from '../utils/SafeStorage';

const NutriContext = createContext();

const getTodayKey = () => new Date().toISOString().split('T')[0];

const loadDailyStats = () => {
    const parsed = SafeStorage.get('nutri_daily_stats');
    if (parsed) {
        // Reset if it's a new day
        if (parsed._date !== getTodayKey()) {
            return { ...defaultDailyStats, _date: getTodayKey() };
        }
        return parsed;
    }
    return { ...defaultDailyStats, _date: getTodayKey() };
};

export const NutriProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(() => {
        return SafeStorage.get('nutri_profile', {
            name: "",
            email: "",
            goals: [],
            age: null,
            weight: null,
            height: null,
            activityLevel: null,
            emotionalState: [],
            weightHistory: [],
            statsHistory: [],
        });
    });

    const [dailyStats, setDailyStats] = useState(loadDailyStats);

    const [favorites, setFavorites] = useState(() => {
        return SafeStorage.get('nutri_favorites', []);
    });

    const [groceryList, setGroceryList] = useState(() => {
        return SafeStorage.get('nutri_grocery', []);
    });

    const [chatHistory, setChatHistory] = useState(() => {
        const saved = SafeStorage.get('nutri_chat_history');
        const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Experto';
        return saved || [
            { id: 1, text: `Hola, ${firstName}. Soy tu asistente de NutriEnclave. ¿En qué puedo ayudarte hoy con tu armonía biológica?`, sender: 'bot', timestamp: new Date().toISOString() }
        ];
    });

    const [darkMode, setDarkMode] = useState(() => {
        return SafeStorage.get('nutri_dark_mode', false);
    });

    const [achievements, setAchievements] = useState(() => {
        return SafeStorage.get('nutri_achievements', initialAchievements);
    });

    const [notifications, setNotifications] = useState(() => {
        return SafeStorage.get('nutri_notifications', initialNotifications);
    });

    const [settings, setSettings] = useState(() => {
        return SafeStorage.get('nutri_settings', defaultSettings);
    });

    // Apply theme to document
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        SafeStorage.set('nutri_dark_mode', darkMode);
    }, [darkMode]);

    // Check for day change to archive daily stats
    useEffect(() => {
        const checkDayChange = () => {
            const lastDate = dailyStats._date;
            const today = getTodayKey();

            if (lastDate !== today) {
                // Archive yesterday's stats if they aren't empty
                setUserProfile(prev => {
                    // Avoid duplicate entries for the same date
                    if (prev.statsHistory.some(h => h.date === lastDate)) return prev;

                    return {
                        ...prev,
                        statsHistory: [
                            ...prev.statsHistory,
                            {
                                date: lastDate,
                                stats: { ...dailyStats },
                                score: calculateBioScore(prev, dailyStats)
                            }
                        ].slice(-30) // Keep last 30 days
                    };
                });

                // Reset daily stats for the new day
                setDailyStats({ ...defaultDailyStats, _date: today });
            }
        };

        checkDayChange();
    }, [dailyStats._date]);

    useEffect(() => {
        SafeStorage.set('nutri_profile', userProfile);
    }, [userProfile]);

    useEffect(() => {
        SafeStorage.set('nutri_daily_stats', dailyStats);
    }, [dailyStats]);

    useEffect(() => {
        SafeStorage.set('nutri_favorites', favorites);
    }, [favorites]);

    useEffect(() => {
        SafeStorage.set('nutri_grocery', groceryList);
    }, [groceryList]);

    useEffect(() => {
        SafeStorage.set('nutri_chat_history', chatHistory);
    }, [chatHistory]);

    useEffect(() => {
        SafeStorage.set('nutri_achievements', achievements);
    }, [achievements]);

    useEffect(() => {
        SafeStorage.set('nutri_notifications', notifications);
    }, [notifications]);

    useEffect(() => {
        SafeStorage.set('nutri_settings', settings);
    }, [settings]);

    const addNotification = useCallback((notif) => {
        setNotifications(prev => [
            {
                id: Date.now(),
                read: false,
                time: 'Ahora',
                ...notif
            },
            ...prev
        ].slice(0, 50));
    }, []);

    const markNotificationRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllNotificationsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    // Achievement & Notification Engine
    useEffect(() => {
        const checkAchievements = () => {
            setAchievements(prev => {
                let updated = false;
                const next = prev.map(ach => {
                    let progress = ach.progress;
                    let current = ach.current;
                    let unlocked = ach.unlocked;

                    if (unlocked) return ach;

                    // Logic for specific achievements
                    if (ach.id === 'water-goal') {
                        // Check last 7 days of statsHistory for days where water goal was met
                        const daysMet = userProfile.statsHistory.filter(h => h.stats.water.current >= h.stats.water.goal).length;
                        // Add today if met
                        const todayMet = dailyStats.water.current >= dailyStats.water.goal ? 1 : 0;
                        current = daysMet + todayMet;
                        progress = Math.min(Math.round((current / ach.target) * 100), 100);
                    }

                    if (ach.id === 'bio-score-90') {
                        const currentScore = calculateBioScore(userProfile, dailyStats);
                        current = currentScore;
                        progress = Math.min(Math.round((current / ach.target) * 100), 100);
                    }

                    if (ach.id === 'streak-7') {
                        // Simple logic: days in statsHistory + today if calories met
                        const daysMet = userProfile.statsHistory.filter(h => h.stats.calories.current >= h.stats.calories.goal * 0.8).length;
                        const todayMet = dailyStats.calories.current >= dailyStats.calories.goal * 0.8 ? 1 : 0;
                        current = daysMet + todayMet;
                        progress = Math.min(Math.round((current / ach.target) * 100), 100);
                    }

                    if (progress >= 100 && !unlocked) {
                        unlocked = true;
                        updated = true;
                        addNotification({
                            type: 'achievement',
                            title: '¡Logro Desbloqueado!',
                            body: `Has conseguido: ${ach.title}. +${ach.xp} XP`,
                            color: ach.color,
                            icon: 'Award'
                        });
                    }

                    if (current !== ach.current || progress !== ach.progress || unlocked !== ach.unlocked) {
                        updated = true;
                        return { ...ach, current, progress, unlocked, date: unlocked ? 'Recién desbloqueado' : ach.date };
                    }
                    return ach;
                });
                return updated ? next : prev;
            });
        };

        const timer = setTimeout(checkAchievements, 1000); // Debounce
        return () => clearTimeout(timer);
    }, [dailyStats, userProfile.statsHistory]);

    // Hydration alerts based on real data
    useEffect(() => {
        if (!settings.hydrationAlerts) return;

        const water = dailyStats.water.current;
        const goal = dailyStats.water.goal;

        if (water > 0 && water < goal * 0.5) {
            // Check if we already notified recently (simple check)
            const hasDraft = notifications.some(n => n.title === 'Hidratación' && n.time === 'Ahora');
            if (!hasDraft && water > 0.1) { // Only if they started drinking but are low
                // addNotification({ ... }); // Disabled to avoid spam for now, but ready
            }
        }
    }, [dailyStats.water.current, settings.hydrationAlerts]);

    const updateProfile = (newData) => {
        setUserProfile(prev => {
            const updated = { ...prev, ...newData };
            // If weight changed, add to history
            if (newData.weight && newData.weight !== prev.weight) {
                updated.weightHistory = [
                    ...prev.weightHistory,
                    { weight: newData.weight, date: new Date().toISOString() }
                ].slice(-50); // Keep last 50 logs
            }
            return updated;
        });
    };

    const addEmotionalLog = (log) => {
        setUserProfile(prev => ({
            ...prev,
            emotionalState: [...prev.emotionalState, { ...log, timestamp: new Date() }]
        }));
    };

    const toggleFavorite = (recipeId) => {
        setFavorites(prev =>
            prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId]
        );
    };

    const addToGroceryList = (ingredients) => {
        setGroceryList(prev => {
            const newList = [...prev];
            ingredients.forEach(ing => {
                if (!newList.find(item => item.name === ing.name)) {
                    newList.push({
                        id: Date.now() + Math.random(),
                        name: ing.name,
                        category: ing.category || 'Otros',
                        checked: false
                    });
                }
            });
            return newList;
        });
    };

    const toggleGroceryItem = (id) => {
        setGroceryList(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const removeGroceryItem = (id) => {
        setGroceryList(prev => prev.filter(item => item.id !== id));
    };

    const addGroceryItem = (name, category = 'otros') => {
        setGroceryList(prev => [...prev, {
            id: Date.now(),
            name,
            category,
            checked: false
        }]);
    };

    const updateStat = useCallback((statKey, value) => {
        setDailyStats(prev => ({
            ...prev,
            [statKey]: { ...prev[statKey], current: value }
        }));
    }, []);

    const incrementStat = useCallback((statKey, amount) => {
        setDailyStats(prev => {
            const stat = prev[statKey];
            const newValue = Math.round((stat.current + amount) * 100) / 100;
            return {
                ...prev,
                [statKey]: { ...stat, current: Math.max(0, newValue) }
            };
        });
    }, []);

    // Helper for evolution charts
    const calculateBioScore = (profile, stats) => {
        let score = 50;
        if (profile.name) score += 4;
        if (profile.email) score += 4;
        if (profile.age) score += 4;
        if (profile.weight) score += 4;
        if (profile.height) score += 4;

        if (profile.goals && profile.goals.length > 0) {
            score += Math.min(profile.goals.length * 3, 10);
        }

        if (stats) {
            const calorieRatio = Math.min(stats.calories.current / stats.calories.goal, 1);
            const waterRatio = Math.min(stats.water.current / stats.water.goal, 1);
            const stepsRatio = Math.min(stats.steps.current / stats.steps.goal, 1);
            const sleepRatio = Math.min(stats.sleep.current / stats.sleep.goal, 1);
            score += Math.round((calorieRatio + waterRatio + stepsRatio + sleepRatio) * 5);
        }
        return Math.min(score, 100);
    };

    return (
        <NutriContext.Provider value={{
            userProfile, updateProfile, addEmotionalLog,
            dailyStats, updateStat, incrementStat,
            favorites, toggleFavorite,
            groceryList, addToGroceryList, toggleGroceryItem, removeGroceryItem, addGroceryItem,
            calculateBioScore,
            chatHistory, setChatHistory,
            achievements, notifications, addNotification, markNotificationRead, markAllNotificationsRead,
            settings, updateSettings,
            darkMode, toggleDarkMode: () => setDarkMode(prev => !prev)
        }}>
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
