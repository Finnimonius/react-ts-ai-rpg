import { create } from "zustand";
import { persist } from "zustand/middleware";
import queryAI from "../services/api";
import { DUNGEONS } from "../utils/data/locations/locations";
import { generateEvent, getRandomEvent } from "../utils/generators/event-generator";

const EVENTS = ['treasure']

type Directions = 'south' | 'southeast' | 'southwest' | 'west' | 'north' | 'northwest' | 'northeast';
type DirectionName = 'Юг' | 'Юго-восток' | 'Юго-запад' |
    'Запад' | 'Север' | 'Северо-запад' | 'Северо-восток';
type TargetLocation = string;

type Path = {
    direction: Directions,
    directionName: DirectionName,
    targetLocationId: TargetLocation,
}

export type GameHistory = {
    type: 'location' | 'travel_event',
    aiText: string,
    directions?: Path[],
}

export type CurrentLocation = 'city' | 'forest' | 'desert';

interface GameStore {
    currentLocation: CurrentLocation,
    currentDungeon: string | null,
    targetLocation: string,
    currentStep: number,
    gameHistory: Array<GameHistory>,
    isLoading: boolean,
    isAddingHistory: boolean,
    error: string | null,
    aiText: string,
    enterLocation: (location: CurrentLocation) => void,
    startGame: () => void,
    movingToLocation: (targetLocation: TargetLocation) => void,
    backToCity: () => void,
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            currentLocation: 'city',
            currentDungeon: null,
            targetLocation: '',
            currentStep: 0,
            gameHistory: [],
            isLoading: false,
            isAddingHistory: false,
            error: null,
            aiText: '',

            enterLocation: (location) => {
                set({
                    currentLocation: location,
                })
            },

            startGame: async () => {
                set({
                    isLoading: true,
                    currentDungeon: 'wind_gorge',
                    isAddingHistory: true,
                })

                const dungeon = getDungeon(DUNGEONS, get().currentDungeon)
                if (!dungeon) {
                    set({ error: "Данж не найден", isLoading: false });
                    return;
                }
                const directions = getDirectionsName(dungeon)

                try {
                    const { gameHistory } = get()
                    const data = await queryAI(`Начни рассказ истории в стиле D&D.
                        Мы сейчас находимся в локации ${dungeon.name}.
                        И в конце предложи пойти на выбор ${directions}`)

                    const historyEntry: GameHistory = {
                        type: 'location',
                        aiText: data,
                        directions: dungeon.paths,
                    }

                    set({
                        aiText: data,
                        isLoading: false,
                        isAddingHistory: false,
                        gameHistory: [...gameHistory, historyEntry]
                    })
                } catch (error) {
                    set({ error: 'Мастер не смог найти историю', isLoading: false })
                    console.log(error);

                }
            },

            movingToLocation: (targetLocationId) => {
                const { currentStep } = get();
                set({
                    isLoading: true,
                    targetLocation: targetLocationId,
                    currentStep: currentStep + 1
                })

                const randomEvent = getRandomEvent(EVENTS);
                const currentEvent = generateEvent(randomEvent)

            },

            backToCity: () => {
                set({
                    currentLocation: 'city',
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

type Dungeons = typeof DUNGEONS;

function getDungeon(dungeons: Dungeons, dungeonKey: string | null): Dungeon | undefined {
    if (!dungeonKey) return undefined;
    return (dungeons as Record<string, Dungeon>)[dungeonKey];
}

function getDirectionsName(dungeon: Dungeon | undefined): string {
    if (!dungeon) return '';
    return dungeon.paths.map(path => path.directionName).join(' ');
}
