import { treasures } from "../data/treasures/treasures";
import { treasureEvents } from "../data/events/treasure-events";

type EventType = 'combat' | 'treasure';

export function getRandomEvent(events: EventType[]): EventType {
    const arrCopy = [...events]
    const index = Math.floor(Math.random() * arrCopy.length)

    return arrCopy[index]
}

export function generateEvent(type: EventType) {
    switch (type) {
        case 'treasure':
            return generateTreasureEvent()
    }
}

function generateTreasureEvent() {
    const randomTreasure = treasureEvents[Math.floor(Math.random() * treasureEvents.length)];
    const randomReward = randomTreasure.container[Math.floor(Math.random() * randomTreasure.container.length)]

    const treasure = treasures[randomReward]
    return {
        ...randomTreasure,
        gold: treasure.gold,
        items: treasure.items
    }
}