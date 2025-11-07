import { create } from "zustand";
import { persist } from "zustand/middleware";
import queryAI from "../services/ai-service";
import { FOREST_LOCATION } from "../utils/data/locations/forest-locations";
import { generateEvent, getRandomEvent } from "../utils/generators/event-generator";
import type { DirectionName, EventType, GameHistory, Path, TargetLocation } from "../types/game.types";

const EVENTS: EventType[] = ['treasure']

interface GameStore {
    // currentLocation: CurrentLocation,
    currentDungeon: string | null,
    targetLocation: string,
    currentStep: number,
    gameHistory: Array<GameHistory>,
    isLoading: boolean,
    error: string | null,
    startGame: () => void,
    movingToLocation: (targetLocation: TargetLocation, directionName: DirectionName) => void,
    updateEventOpenedStatus: () => void,
    updateEventTakenStatus: () => void,
    backToCity: () => void,
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            // currentLocation: 'city',
            currentDungeon: null,
            targetLocation: '',
            currentStep: 0,
            gameHistory: [],
            isLoading: false,
            error: null,

            startGame: async () => {
                set({
                    isLoading: true,
                    currentDungeon: 'wind_gorge',
                })

                const dungeon = getDungeon(FOREST_LOCATION, get().currentDungeon)
                if (!dungeon) {
                    set({ error: "Данж не найден", isLoading: false });
                    return;
                }
                const directions = getDirectionsName(dungeon)

                try {
                    const { gameHistory } = get()
                    const data = await queryAI(`Начни рассказ истории в стиле RPG.
                        Мы сейчас находимся в локации ${dungeon.name}.
                        И в конце предложи пойти на выбор ${directions}`)

                    const historyEntry: GameHistory = {
                        type: 'location',
                        aiText: data,
                        directions: dungeon.paths,
                    }

                    set({
                        isLoading: false,
                        gameHistory: [...gameHistory, historyEntry]
                    })
                } catch (error) {
                    set({ error: 'Мастер не смог найти историю', isLoading: false })
                    console.log(error);
                }
            },

            movingToLocation: async (targetLocationId, directionName) => {
                const { currentStep } = get();
                set({
                    isLoading: true,
                    targetLocation: targetLocationId,
                    currentStep: currentStep + 1
                })

                const randomEvent = getRandomEvent(EVENTS);
                const currentEvent = generateEvent(randomEvent)
                if (!currentEvent) {
                    set({ error: "Событие не найдено", isLoading: false });
                    return;
                }

                try {
                    const { gameHistory } = get()
                    const data = await queryAI(`Игрок направляется на ${directionName}. 
                        На пути у нас событие ${currentEvent.title}. Описание события: ${currentEvent.description}. 
                        Напиши описание в стиле RPG`);

                    const historyEntry: GameHistory = {
                        type: 'travel_event',
                        aiText: data,
                        currentEvent: currentEvent,
                    }

                    set({
                        isLoading: false,
                        gameHistory: [...gameHistory, historyEntry]
                    })
                } catch (error) {
                    console.log(error);
                }

            },

            updateEventOpenedStatus: () => {
                const { gameHistory } = get();
                const lastEntry = gameHistory[gameHistory.length - 1]

                if (!lastEntry.currentEvent) return
                let newCurrentEvent = { ...lastEntry.currentEvent };

                newCurrentEvent = { ...newCurrentEvent, isOpened: true };
                const newHistory = [...gameHistory]
                newHistory[newHistory.length - 1].currentEvent = newCurrentEvent;

                set({
                    gameHistory: newHistory
                })
            },

            updateEventTakenStatus: () => {
                const { gameHistory } = get();
                const lastEntry = gameHistory[gameHistory.length - 1]

                if (!lastEntry.currentEvent) return
                let newCurrentEvent = { ...lastEntry.currentEvent };

                newCurrentEvent = {
                    ...newCurrentEvent,
                    isTaken: true,
                    isOpened: false
                };

                const newHistory = [...gameHistory]
                newHistory[newHistory.length - 1].currentEvent = newCurrentEvent;

                set({
                    gameHistory: newHistory
                })
            },

            backToCity: () => {
                set({
                    // currentLocation: 'city',
                    currentDungeon: null,
                    gameHistory: [],
                })
            }

        }),
        {
            name: 'game-storage',
        }
    )
)

type Dungeon = {
    id: string,
    name: string,
    description: string,
    paths: Array<Path>,
}

type Dungeons = typeof FOREST_LOCATION;

function getDungeon(dungeons: Dungeons, dungeonKey: string | null): Dungeon | undefined {
    if (!dungeonKey) return undefined;
    return (dungeons as Record<string, Dungeon>)[dungeonKey];
}

function getDirectionsName(dungeon: Dungeon | undefined): string {
    if (!dungeon) return '';
    return dungeon.paths.map(path => path.directionName).join(' ');
}
