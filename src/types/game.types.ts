import type { AnyItem, InventoryItemType } from "./inventory.types";

type Directions = 'south' | 'southeast' | 'southwest' | 'west' | 'north' | 'northwest' | 'northeast';
export type DirectionName = 'Юг' | 'Юго-восток' | 'Юго-запад' |
    'Запад' | 'Север' | 'Северо-запад' | 'Северо-восток';
export type TargetLocation = string;

export type Path = {
    direction: Directions,
    directionName: DirectionName,
    targetLocationId: TargetLocation,
}

export type TreasureType = 'chest' | 'large_chest' | 'gemstones' | 'bag';

export type TreasureEventData = {
    id: string,
    title: string,
    description: string,
    container: TreasureType[],
}

export type Treasure = {
    type: InventoryItemType,
    category?: string,
    chance: number
}

export interface TreasureContainer {
    img: string,
    rewards: Treasure[]
}

export type CurrentEvent = {
    eventType: EventType,
    id: string,
    title: string,
    description: string,
    container: TreasureType[],
    img: string,
    reward: AnyItem,
    isOpened: boolean,
    isTaken: boolean,
}

export type GameHistory = {
    type: 'location' | 'travel_event',
    aiText: string,
    directions?: Path[],
    currentEvent?: CurrentEvent,
}

export type CurrentLocation = 'forest' | 'desert';
export type EventType = 'combat' | 'treasure';

