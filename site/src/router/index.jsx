import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import OnboardingStep1 from '../pages/onboarding/Step1';
import OnboardingStep2 from '../pages/onboarding/Step2';
import OnboardingStep3 from '../pages/onboarding/Step3';
import OnboardingStep4 from '../pages/onboarding/Step4';
import OnboardingStep5 from '../pages/onboarding/Step5';
import LoadingScreen from '../pages/onboarding/Loading';
import SuccessScreen from '../pages/onboarding/Success';
import Dashboard from '../pages/Dashboard';
import AIChat from '../pages/AIChat';
import GroceryList from '../pages/GroceryList';
import Profile from '../pages/Profile';
import SafeSpace from '../pages/SafeSpace';
import EvolutionStats from '../pages/EvolutionStats';
import RecipeDetail from '../pages/RecipeDetail';
import RecipeList from '../pages/RecipeList';
import MealPlan from '../pages/MealPlan';
import Notifications from '../pages/Notifications';
import Achievements from '../pages/Achievements';
import Settings from '../pages/Settings';
import FoodHistory from '../pages/FoodHistory';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/onboarding/1" element={<OnboardingStep1 />} />
                <Route path="/onboarding/2" element={<OnboardingStep2 />} />
                <Route path="/onboarding/3" element={<OnboardingStep3 />} />
                <Route path="/onboarding/4" element={<OnboardingStep4 />} />
                <Route path="/onboarding/5" element={<OnboardingStep5 />} />
                <Route path="/loading" element={<LoadingScreen />} />
                <Route path="/success" element={<SuccessScreen />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<AIChat />} />
                <Route path="/grocery-list" element={<GroceryList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/safe-space" element={<SafeSpace />} />
                <Route path="/evolution" element={<EvolutionStats />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/recipe" element={<RecipeDetail />} />
                <Route path="/recipes" element={<RecipeList />} />
                <Route path="/meal-plan" element={<MealPlan />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/food-history" element={<FoodHistory />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
