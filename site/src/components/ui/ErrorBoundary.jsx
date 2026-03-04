import React, { Component } from 'react';
import { Shield, RefreshCcw, Home } from 'lucide-react';
import { SafeStorage } from '../../utils/SafeStorage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Enviar a consola con detalle máximo para depuración remota
        console.group("🆘 Error Crítico en el Enclave");
        console.error("Mensaje:", error.message);
        console.error("Stack:", error.stack);
        console.error("Component Stack:", errorInfo.componentStack);
        console.groupEnd();
    }

    handleReset = () => {
        // Solo recarga para intentar recuperación suave
        window.location.reload();
    };

    handleHardReset = () => {
        if (window.confirm("Esto reiniciará tu configuración del Enclave. ¿Deseas continuar?")) {
            SafeStorage.clear();
            window.location.href = '/';
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-zen-bg flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary-soft flex items-center justify-center mb-6 border border-primary border-opacity-20">
                        <Shield size={40} className="text-primary" strokeWidth={1} />
                    </div>

                    <h1 className="text-2xl font-light tracking-tight mb-2">Sintonía Interrumpida</h1>
                    <p className="text-sm text-gray-400 font-light max-w-xs mb-8">
                        Hemos detectado una anomalía en el flujo biológico de la aplicación. Tu Enclave está protegido.
                    </p>

                    <div className="w-full max-w-xs space-y-3">
                        <button
                            onClick={this.handleReset}
                            className="zen-pill-button primary w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCcw size={16} />
                            REINTENTAR SINTONÍA
                        </button>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="zen-pill-button w-full flex items-center justify-center gap-2 text-gray-400 border-gray-100"
                        >
                            <Home size={16} />
                            VOLVER AL ENCLAVE
                        </button>

                        <div className="pt-8">
                            <button
                                onClick={this.handleHardReset}
                                className="text-[10px] text-gray-300 uppercase tracking-widest bg-transparent border-none cursor-pointer hover:text-red-400 transition-colors"
                            >
                                Reinicio de Emergencia
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
