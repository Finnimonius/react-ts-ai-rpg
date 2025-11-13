import type { CreateGameDto } from "../types/dto/game/createGameDto";
import type { MoveToLocationDto } from "../types/dto/game/moveToLocationDto";
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
    },

    async deleteGame() {
        return apiClient('/game', {
            method: 'DELETE'
        })
    },

    async moveToLocation(moveData: MoveToLocationDto) {
        return apiClient('/game/move', {
            method: 'POST',
            body: moveData
        })
    }
}