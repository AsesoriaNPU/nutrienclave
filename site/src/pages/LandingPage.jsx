import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-[#1B2733] antialiased">
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="relative w-10 h-10 bg-[#2B59FF] rounded-full flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-[#059669] text-2xl z-10">energy_savings_leaf</span>
                            <div className="absolute inset-0 border-[1.5px] border-white/20 rounded-full"></div>
                        </div>
                        <h2 className="text-[#1B2733] text-xl font-extrabold tracking-tight">
                            <span className="text-[#059669]">Nutri</span><span className="text-[#2B59FF]">Enclave</span>
                        </h2>
                    </div>
                    <nav className="hidden lg:flex items-center gap-10">
                        <a className="text-[#1B2733] text-sm font-semibold hover:text-[#2B59FF] transition-colors" href="#">Inicio</a>
                        <a className="text-[#1B2733] text-sm font-semibold hover:text-[#2B59FF] transition-colors" href="#">Nosotros</a>
                        <a className="text-[#1B2733] text-sm font-semibold hover:text-[#2B59FF] transition-colors" href="#">Servicios</a>
                        <a className="text-[#1B2733] text-sm font-semibold hover:text-[#2B59FF] transition-colors" href="#">Blog</a>
                    </nav>
                    <button className="bg-[#059669] hover:bg-opacity-90 text-[#1B2733] px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95">
                        Llamada telefónica
                    </button>
                </div>
            </header>

            <main>
                <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2B59FF]/5 border border-[#2B59FF]/10 text-[#2B59FF] text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="flex h-2 w-2 rounded-full bg-[#2B59FF]"></span>
                                Bienestar Digital 24/7
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black text-[#1B2733] leading-[1.1] mb-6">
                                Salud, <span className="text-[#059669]">enclave</span> <span className="text-[#2B59FF]">emocional</span>
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                La app que entiende no solo qué comes, sino cómo te sientes. Transforma tu relación con la alimentación mediante tecnología de vanguardia y bienestar integral.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => navigate('/onboarding/1')}
                                    className="bg-[#059669] hover:bg-opacity-90 text-[#1B2733] text-lg font-bold px-10 py-5 rounded-full transition-all shadow-lg active:scale-95"
                                >
                                    Empezar ahora
                                </button>
                                <button className="border-2 border-[#2B59FF] text-[#2B59FF] hover:bg-[#2B59FF] hover:text-white text-lg font-bold px-10 py-5 rounded-full transition-all">
                                    Saber más
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 w-full relative">
                            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                                <div
                                    className="aspect-[4/3] bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQvMzVms4WA2UQdnSDCbxfyzKqinQy8zF4wbN3mE0i5ek7cHQVA7yqN8G_amhqaSXJf4lD75rsmmx_epVxd50khioEhv6RWmYWzb14jZOAdydvApFS_dlcDNpDKANkeDil8M7phHjvL6nJ2Y_Vh8ssyQq9Pwz8W4iLSDLU6o-5SvoVZ2uVYKOboHlcALOIlsSHOYpjk9QHX3TKtzX4avXonxfNYtrdMFHuXkd9quj1cXW9gvdnHvIBMi4QoJRkiuI1wyXUwcKLUTkK')" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#F8F9FA] py-20 lg:py-28">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1B2733] mb-16">Nuestras Características</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon="favorite"
                                title="Seguimiento Emocional"
                                description="Monitoreo del aspecto psicológico de la alimentación para un bienestar integral y duradero."
                                color="brand-blue"
                            />
                            <FeatureCard
                                icon="insights"
                                title="Progreso Visual"
                                description="Visualización clara de tus hitos de salud y evolución personal a través de gráficos inteligentes."
                                color="primary"
                            />
                            <FeatureCard
                                icon="verified_user"
                                title="Adherencia Real"
                                description="Enfoque en hábitos sostenibles y flexibles en lugar de dietas restrictivas que no funcionan."
                                color="brand-blue"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 bg-[#2B59FF] rounded-full flex items-center justify-center overflow-hidden">
                            <span className="material-symbols-outlined text-[#059669] text-lg z-10">energy_savings_leaf</span>
                        </div>
                        <h2 className="text-[#1B2733] text-lg font-extrabold tracking-tight">
                            <span className="text-[#059669]">Nutri</span><span className="text-[#2B59FF]">Enclave</span>
                        </h2>
                    </div>
                    <p className="text-gray-500 text-sm">© 2024 NutriEnclave. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, color }) => {
    const colorClass = color === 'primary' ? 'text-[#059669] bg-[#059669]/10 group-hover:bg-[#059669]' : 'text-[#2B59FF] bg-[#2B59FF]/10 group-hover:bg-[#2B59FF]';

    return (
        <div className="bg-white p-8 lg:p-10 rounded-[12px] shadow-sm hover:shadow-md transition-shadow border border-gray-50 group">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors ${colorClass}`}>
                <span className="material-symbols-outlined text-3xl group-hover:text-white">{icon}</span>
            </div>
            <h3 className="text-xl font-bold text-[#1B2733] mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default LandingPage;
