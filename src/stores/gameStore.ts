import { create } from "zustand";
import type { Game } from "../types/game.types";
import type { ALL_LOCATIONS } from "../utils/data/locations/all-locations";
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
    // movingToLocation: (targetLocation: TargetLocation, directionName: DirectionName) => void,
    // updateEventOpenedStatus: () => void,
    // updateEventTakenStatus: () => void,
    // backToCity: () => void,
}

export const useGameStore = create<GameStore>()(
    (set, get) => ({
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
                set({ isInitialLoading: false })
            }
        },

        deleteGame: async () => {
            set({ isLoading: true});
            try {
                await gameApi.deleteGame();

                set({
                    isLoading: false,
                    game: null
                })
            } catch {
                set({ isLoading: false})
            }
        }

        // movingToLocation: async (targetLocationId, directionName) => {
        //     const { currentStep } = get();
        //     set({
        //         isLoading: true,
        //         targetLocation: targetLocationId,
        //         currentStep: currentStep + 1
        //     })

        //     const randomEvent = getRandomEvent(EVENTS);
        //     const currentEvent = generateEvent(randomEvent)
        //     if (!currentEvent) {
        //         set({ error: "Событие не найдено", isLoading: false });
        //         return;
        //     }

        //     try {
        //         const { gameHistory } = get()
        //         const data = await queryAI(`Игрок направляется на ${directionName}. 
        //                 На пути у нас событие ${currentEvent.title}. Описание события: ${currentEvent.description}. 
        //                 Напиши описание в стиле RPG`);

        //         const historyEntry: GameHistory = {
        //             type: 'travel_event',
        //             aiText: data,
        //             currentEvent: currentEvent,
        //         }

        //         set({
        //             isLoading: false,
        //             gameHistory: [...gameHistory, historyEntry]
        //         })
        //     } catch (error) {
        //         console.log(error);
        //     }

        // },

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



