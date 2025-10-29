const SERVER_URL = 'http://localhost:3001';

export async function loginQuery(email: string, password: string) {
    try {
        const response = await fetch(`${SERVER_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`)
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return null
    }
}

export async function logoutQuery() {
    try {
        const response = await fetch(`${SERVER_URL}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`)
        }

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return null
    }
}

export async function registerQuery(nickName: string, email: string, password: string, confirmPassword: string) {
    try {
        const response = await fetch(`${SERVER_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nickName, email, password, confirmPassword }),
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return null
    }
}

export async function profileQuery() {
    try {
        const response = await fetch(`${SERVER_URL}/api/auth/profile`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Ошибка запроса', error)
        return null
    }
}