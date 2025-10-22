import { treasures } from "../data/treasures/treasures";
import { treasureEvents } from "../data/events/treasure-events";
import type { CurrentEvent, EventType, Treasure } from "../../types/game.types";
import type { Rarity } from "../../types/inventory.types";
import { ALL_ITEMS_BY_TYPE_AND_RARITY } from "../data/items/items";

export function getRandomEvent(events: EventType[]): EventType {
    const arrCopy = [...events]
    const index = Math.floor(Math.random() * arrCopy.length)

    return arrCopy[index]
}

export function generateEvent(type: EventType) {
    switch (type) {
        case 'treasure':
            return generateTreasureEvent(type)
    }
}

function getRandomTreasureReward(rewards: Treasure[]): Treasure {
    const totalChance = rewards.reduce((sum, reward) => sum + reward.chance, 0);

    const random = Math.random() * totalChance;

    let currentChance = 0;

    for (const reward of rewards) {
        currentChance += reward.chance
        if (random <= currentChance) {
            return reward
        }
    }

    return rewards[rewards.length - 1];
}

function getWeightedRarity(): Rarity {
    const rarities: Rarity[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    const chances = [55, 25, 12, 6, 2]

    const random = Math.random() * 100;

    let currentChance = 0;

    for (let i = 0; i < rarities.length; i++) {
        currentChance += chances[i];
        if (random <= currentChance) {
            return rarities[i];
        }
    }

    return 'common'
}

function generateTreasureEvent(type: EventType): CurrentEvent {
    const randomTreasureEvent = treasureEvents[Math.floor(Math.random() * treasureEvents.length)];
    const randomRewardType = randomTreasureEvent.container[Math.floor(Math.random() * randomTreasureEvent.container.length)]

    const treasureContainer = treasures[randomRewardType];
    const treasureReward = getRandomTreasureReward(treasureContainer.rewards);

    const weigth = getWeightedRarity();

    const randomIndex = Math.floor(Math.random() * ALL_ITEMS_BY_TYPE_AND_RARITY[treasureReward.type][weigth].length)

    const reward = ALL_ITEMS_BY_TYPE_AND_RARITY[treasureReward.type][weigth][randomIndex]

    return {
        eventType: type,
        ...randomTreasureEvent,
        img: treasureContainer.img,
        reward: {
            ...reward,
            img: reward.img
        }
    }
}