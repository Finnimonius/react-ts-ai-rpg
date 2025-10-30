export function getErrorMessage(error: unknown): string {
    if (typeof error === 'string') return error;
    if (error instanceof Error) return error.message;
    
    // Для ошибок от бэкенда
    if (typeof error === 'object' && error !== null) {
        const obj = error as { response?: { data?: { error?: string } } };
        return obj.response?.data?.error || 'Неизвестная ошибка';
    }
    
    return 'Неизвестная ошибка';
}