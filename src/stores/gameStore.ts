import { create } from "zustand";
import { persist } from "zustand/middleware";
import queryAI from "../services/api";
import { DUNGEONS } from "../utils/data/locations";

type GameHistory = {
    aiText: string,
    directions: string[],
}

type CurrentLocation = 'city' | 'forest' | 'desert'

interface GameStore {
    currentLocation: CurrentLocation,
    currentDungeon: string | null,
    gameHistory: Array<GameHistory>,
    isLoading: boolean,
    error: string | null,
    aiText: string,
    enterLocation: (location: CurrentLocation) => void,
    startGame: () => void,
    backToCity: () => void,
}

export const useGameStore = create<GameStore>()(
    persist(
        (set, get) => ({
            currentLocation: 'city',
            currentDungeon: null,
            gameHistory: [],
            isLoading: false,
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
                })

                const dungeon = getDungeon(DUNGEONS, get().currentDungeon)
                if (!dungeon) {
                    set({ error: "Данж не найден", isLoading: false });
                    return;
                }
                const directions = getDirections(dungeon)

                try {
                    const { gameHistory } = get()
                    const data = await queryAI(`Начни рассказ истории в стиле D&D. Мы сейчас находимся в локации ${dungeon.name}. И в конце предложи пойти на выбор ${directions}`)

                    const historyEntry = {
                        aiText: data,
                        directions: directions.split(' '),
                    }

                    set({
                        aiText: data,
                        isLoading: false,
                        gameHistory: [...gameHistory, historyEntry]
                    })
                } catch (error) {
                    set({ error: 'Мастер не смог найти историю', isLoading: false })
                    console.log(error);
                    
                }
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

type Path = {
    direction: 'south' | 'southeast' | 'southwest' | 'west' | 'north' | 'northwest' | 'northeast',
    directionName: 'Юг' | 'Юго-восток' | 'Юго-запад' | 'Запад' | 'Север' | 'Северо-запад' | 'Северо-восток',
    targetLocationId: string,
}

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

function getDirections(dungeon: Dungeon | undefined): string {
    if (!dungeon) return "";
    return dungeon.paths.map(path => path.directionName).join(' ');
}
