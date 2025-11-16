import { create } from "zustand";
import type { Directions, Game } from "../types/game.types";
import { DIRECTION_NAMES, type ALL_LOCATIONS } from "../utils/data/locations/all-locations";
import { gameApi } from "../services/game-service";
import { treasureApi } from "../services/treasure-service";

interface GameStore {
    game: Game | null,
    isLoading: boolean,
    isInitialLoading: boolean,
    error: string | null,
    startGame: (currentDungeon: keyof typeof ALL_LOCATIONS) => Promise<void>,
    loadGame: () => Promise<void>,
    deleteGame: () => Promise<void>,
    movingToLocation: (directionId: Directions) => Promise<void>,
    updateEventOpenedStatus: () => Promise<void>,
    updateEventTakenStatus: () => Promise<void>,
}

export const useGameStore = create<GameStore>()(
    (set) => ({
        game: null,
        isLoading: false,
        isInitialLoading: false,
        error: null,

        startGame: async (currentDungeon) => {
            set({ isLoading: true })

            try {
                const response = await gameApi.createGame({
                    currentDungeon: currentDungeon
                });
                const game = response.game;

                set({
                    isLoading: false,
                    game: game
                })
            } catch {
                set({ isLoading: false })
            }
        },

        loadGame: async () => {
            set({ isInitialLoading: true });
            try {
                const response = await gameApi.getGame()
                const game = response.game;

                set({
                    isInitialLoading: false,
                    game: game
                })
            } catch {
                set({
                    isInitialLoading: false,
                    game: null
                })
            }
        },

        deleteGame: async () => {
            set({ isInitialLoading: true });
            try {
                await gameApi.deleteGame();

                set({
                    isInitialLoading: false,
                    game: null
                })
            } catch {
                set({ isInitialLoading: false })
            }
        },

        movingToLocation: async (directionId) => {
            set({ isLoading: true });
            try {
                const response = await gameApi.moveToLocation({
                    directionId: directionId,
                    directionName: DIRECTION_NAMES[directionId]
                })

                const game = response.game;

                set({
                    isLoading: false,
                    game: game
                })
            } catch {
                set({
                    isLoading: false
                })
            }
        },

        updateEventOpenedStatus: async () => {
            try {
                const response = await treasureApi.updateEventOpenedStatus();

                const game = response.game;
                set({

                    game: game
                })
            } catch {
                throw new Error('');

            }
        },

        updateEventTakenStatus: async () => {
            try {
                const response = await treasureApi.updateEventTakenStatus();

                const game = response.game;
                set({
                    game: game
                })
            } catch {
                throw new Error('');
            }
        },
    }),
)



