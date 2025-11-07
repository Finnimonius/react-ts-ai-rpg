import type { CreateGameDto } from "../types/dto/game/createGameDto";

const SERVER_URL = 'http://localhost:3001';

export const gameApi = {
    async create(createData: CreateGameDto) {
        try {
            const response = await fetch(`${SERVER_URL}/api/game`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createData),
                credentials: 'include'
            });

            if (!response.ok) throw new Error(`Ошибка сервера: ${response.status}`);

            const data = await response.json();

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    }
}