import { create } from "zustand";
import { persist } from "zustand/middleware";
import queryAI from "../services/api";
import { DUNGEONS } from "../utils/data/locations/forest-locations";
import { generateEvent, getRandomEvent, type EventType } from "../utils/generators/event-generator";

const EVENTS: EventType[] = ['treasure']

type Directions = 'south' | 'southeast' | 'southwest' | 'west' | 'north' | 'northwest' | 'northeast';
export type DirectionName = 'Юг' | 'Юго-восток' | 'Юго-запад' |
    'Запад' | 'Север' | 'Северо-запад' | 'Северо-восток';
export type TargetLocation = string;

type Path = {
    direction: Directions,
    directionName: DirectionName,
    targetLocationId: TargetLocation,
}

type CurrentEvent = {
    eventType: EventType,
    id: string,
    title: string,
    description: string,
    container: string[]
    gold: number,
    items: string[],
}

export type GameHistory = {
    type: 'location' | 'travel_event',
    aiText: string,
    directions?: Path[],
    currentEvent?: CurrentEvent,
}

export type CurrentLocation = 'city' | 'forest' | 'desert';

interface GameStore {
    currentLocation: CurrentLocation,
    currentDungeon: string | null,
    targetLocation: string,
    currentStep: number,
    gameHistory: Array<GameHistory>,
    isLoading: boolean,
    error: string | null,
    enterLocation: (location: CurrentLocation) => void,
    startGame: () => void,
    movingToLocation: (targetLocation: TargetLocation, directionName: DirectionName) => void,
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
            error: null,

            enterLocation: (location) => {
                set({
                    currentLocation: location,
                })
            },

            startGame: async () => {
                set({
                    isLoading: true,
                    currentDungeon: 'wind_gorge',
                })

                const dungeon = getDungeon(DUNGEONS, get().currentDungeon)
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
                //    id: 'forgotten_chest',
                //     title: 'Забытый сундук',
                //     description: 'Вы нашли старый сундук, спрятанный в руинах.',
                //     container: ['chest', 'gemstones']
                //     gold: 80,
                //     items: ['diamond', 'emerald', 'sapphire', 'ruby'],
                //   }

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

type Dungeons = typeof DUNGEONS;

function getDungeon(dungeons: Dungeons, dungeonKey: string | null): Dungeon | undefined {
    if (!dungeonKey) return undefined;
    return (dungeons as Record<string, Dungeon>)[dungeonKey];
}

function getDirectionsName(dungeon: Dungeon | undefined): string {
    if (!dungeon) return '';
    return dungeon.paths.map(path => path.directionName).join(' ');
}
