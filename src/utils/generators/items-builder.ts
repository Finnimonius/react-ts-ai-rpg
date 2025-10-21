import type { BaseStats, ClassId } from "../../types/character.types";
import type { Accessory, Armor, Consumable, Equipment, EquipmentStats, InventorySlot, Weapon } from "../../types/inventory.types";
import { classConfigs } from "../data/items/starterGear";

export const getStartingEquipment = (classId: ClassId): Equipment => {
    return classConfigs[classId].equipment;
};

export const getStartingInventory = (classId: ClassId): InventorySlot[] => {
    return classConfigs[classId].inventory;
};

export const canEquipItem = (item: Weapon | Armor | Accessory | Consumable, slot: keyof Equipment, level: number): boolean => {
    if (item.type === 'consumable' || item.type === 'quest') {
        return false;
    }

    if (level < item.requiredLevel) {
        return false;
    }

    switch (slot) {
        case 'weapon_main':
        case 'weapon_off':
            return item.type === 'weapon';
        case 'helmet':
        case 'chest':
        case 'gloves':
        case 'legs':
        case 'boots':
            return item.type === 'armor' && (item as Armor).slot === slot;
        case 'ring_1':
        case 'ring_2':
            return item.type === 'accessory' && (item as Accessory).slot?.startsWith('ring');
        case 'amulet':
            return item.type === 'accessory' && (item as Accessory).slot === 'amulet';
        default:
            return false;
    }
};

export const calculateEuqipmentStats = (equipment: Equipment): EquipmentStats => {
    const result = {
        stats: {
            strength: 0,
            dexterity: 0,
            intelligence: 0,
            wisdom: 0,
            constitution: 0,
            luck: 0,
        },
        damage: { min: 0, max: 0 },
        defense: 0,
    };

    Object.values(equipment).forEach(item => {

        if (!item) return

        if (item.stats) {
            Object.entries(item.stats).forEach(([stat, value]) => {
                const statKey = stat as keyof BaseStats;
                if (typeof value === 'number') {
                    result.stats[statKey] += value
                }

            })
        }

        if (item.type === 'weapon') {
            result.damage.min += item.damage.min;
            result.damage.max += item.damage.max;
        }

        if (item.type === 'accessory' && item.damage) {
            result.damage.min += item.damage.min || 0;
            result.damage.max += item.damage.max || 0;
        }

        if (item.type === 'armor') {
            result.defense += item.defense
        }
    })

    return result
}