/**
 * SafeStorage Utility
 * Proporciona una capa de seguridad sobre localStorage para manejar
 * errores de parseo y asegurar la integridad de los datos del Enclave.
 */

export const SafeStorage = {
    /**
     * Guarda un objeto en localStorage de forma segura
     */
    set: (key, value) => {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error(`SafeStorage Error [set]: Fallo al guardar ${key}`, error);
            return false;
        }
    },

    /**
     * Recupera un objeto de localStorage validando su integridad
     */
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            if (item === null) return defaultValue;

            const parsed = JSON.parse(item);

            // Si el valor es null o undefined tras el parseo, devolver default
            if (parsed === null || parsed === undefined) return defaultValue;

            return parsed;
        } catch (error) {
            console.error(`SafeStorage Error [get]: Datos corruptos en ${key}. Restaurando valor por defecto.`, error);
            return defaultValue;
        }
    },

    /**
     * Elimina un item de forma segura
     */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`SafeStorage Error [remove]: Fallo al eliminar ${key}`, error);
            return false;
        }
    },

    /**
     * Limpia todo el almacenamiento del Enclave
     */
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('SafeStorage Error [clear]: Fallo al limpiar el almacenamiento', error);
            return false;
        }
    }
};
