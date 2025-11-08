export const config = {
    apiUrl: import.meta.env.VITE_API_URL,
    environment: import.meta.env.VITE_ENVIRONMENT,
    debug: import.meta.env.VITE_DEBUG === 'true',
}