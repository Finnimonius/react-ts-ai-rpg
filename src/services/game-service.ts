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

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || `Ошибка сервера: ${response.status}`);

            return data
        } catch (error) {
            console.error('Ошибка запроса', error)
            throw error
        }
    }
}