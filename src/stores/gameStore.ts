import { create } from "zustand";
import type { Directions, Game } from "../types/game.types";
import { DIRECTION_NAMES, type ALL_LOCATIONS } from "../utils/data/locations/all-locations";
import { gameApi } from "../services/game-service";

interface GameStore {
    game: Game | null,
    // currentDungeon: string | null,
    // targetLocation: string,
    // currentStep: number,
    // gameHistory: Array<GameHistory>,
    isLoading: boolean,
    isInitialLoading: boolean,
    error: string | null,
    startGame: (currentDungeon: keyof typeof ALL_LOCATIONS) => Promise<void>,
    loadGame: () => Promise<void>,
    deleteGame: () => Promise<void>,
    movingToLocation: (directionId: Directions) => Promise<void>,
    // updateEventOpenedStatus: () => void,
    // updateEventTakenStatus: () => void,
    // backToCity: () => void,
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
                console.log(game)

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

        // updateEventOpenedStatus: () => {
        //     const { gameHistory } = get();
        //     const lastEntry = gameHistory[gameHistory.length - 1]

        //     if (!lastEntry.currentEvent) return
        //     let newCurrentEvent = { ...lastEntry.currentEvent };

        //     newCurrentEvent = { ...newCurrentEvent, isOpened: true };
        //     const newHistory = [...gameHistory]
        //     newHistory[newHistory.length - 1].currentEvent = newCurrentEvent;

        //     set({
        //         gameHistory: newHistory
        //     })
        // },

        // updateEventTakenStatus: () => {
        //     const { gameHistory } = get();
        //     const lastEntry = gameHistory[gameHistory.length - 1]

        //     if (!lastEntry.currentEvent) return
        //     let newCurrentEvent = { ...lastEntry.currentEvent };

        //     newCurrentEvent = {
        //         ...newCurrentEvent,
        //         isTaken: true,
        //         isOpened: false
        //     };

        //     const newHistory = [...gameHistory]
        //     newHistory[newHistory.length - 1].currentEvent = newCurrentEvent;

        //     set({
        //         gameHistory: newHistory
        //     })
        // },

        // backToCity: () => {
        //     set({
        //         // currentLocation: 'city',
        //         currentDungeon: null,
        //         gameHistory: [],
        //     })
        // }

    }),
)



