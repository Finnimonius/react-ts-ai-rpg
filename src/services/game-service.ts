import { config } from "../config/env";
import type { CreateGameDto } from "../types/dto/game/createGameDto";

export const gameApi = {
    async createGame(createData: CreateGameDto) {
        try {
            const response = await fetch(`${config.apiUrl}/game`, {
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