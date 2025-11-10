import { config } from '../../config/env';

type RequestOptions<T> = {
    method?: string,
    headers?: Record<string, string>,
    body?: T
}

export async function apiClient<T = undefined>(endpoint: string, options: RequestOptions<T> = {}) {
    try {
        const response = await fetch(`${config.apiUrl}${endpoint}`, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: options.body ? JSON.stringify(options.body) : undefined,
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || `Ошибка сервера: ${response.status}`);
        }

        return data
    } catch (error) {
        console.error(`Ошибка запроса ${endpoint}:`, error);
        throw error;
    }
}