import type { CombatState } from "./combat.types";
import type { EnemyInstance } from "./enemies.types";
import type { AnyItem } from "./inventory.types";

export type Directions = 'south' | 'southeast' | 'southwest' | 'west' | 'north' | 'northwest' | 'northeast';
export type DirectionName = 'Юг' | 'Юго-восток' | 'Юго-запад' |
    'Запад' | 'Север' | 'Северо-запад' | 'Северо-восток';

export type TreasureType = 'chest' | 'large_chest' | 'gemstones' | 'bag';

// export type TreasureEventData = {
//     id: string,
//     title: string,
//     description: string,
//     container: TreasureType[],
// }

// export type Treasure = {
//     type: InventoryItemType,
//     category?: string,
//     chance: number
// }

export interface TreasureContainer {
    img: string,
}

export type CurrentEvent = {
    eventType: EventType,
    id: string,
    title: string,
    description: string,
    container?: TreasureType[],
    rewardBox?: TreasureType,
    reward?: AnyItem,

    enemy?: EnemyInstance,
    combatState?: CombatState,
    isOpened: boolean,
    isTaken: boolean,
    isSkipped: boolean,
}

export type GameHistory = {
    type: 'location' | 'travel_event',
    aiText: string,
    currentEvent: CurrentEvent,
    directions?: Directions[],
    currentDirection: Directions,
    isDirectionUsed?: boolean,

}

export interface Game {
    _id?: string,
    userId: string,
    currentDungeon: string,
    currentLocation: string,
    currentLocationName: string,
    targetLocation: string | null,
    currentSteps: number,
    gameHistories: GameHistory[]
}

export type EventType = 'combat' | 'treasure';

