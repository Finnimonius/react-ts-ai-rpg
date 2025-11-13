import type { CreateGameDto } from "../types/dto/game/createGameDto";
import { apiClient } from "../utils/api/apiClient";

export const gameApi = {
    async createGame(createData: CreateGameDto) {
        return apiClient<CreateGameDto>('/game', {
            method: 'POST',
            body: createData
        })
    },

    async getGame() {
        return apiClient('/game')
    }
}