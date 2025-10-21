import type { BaseStats, ClassId } from "../../types/character.types";
import type { Accessory, Armor, Consumable, Equipment, EquipmentStats, InventorySlot, Weapon } from "../../types/inventory.types";
import { classConfigs } from "../data/items/starterGear";

export const getStartingEquipment = (classId: ClassId): Equipment => {
    return classConfigs[classId].equipment;
};

export const getStartingInventory = (classId: ClassId): InventorySlot[] => {
    return classConfigs[classId].inventory;
};

interface EquipResult {
    canEquip: boolean;
    reason?: 'wrong_type' | 'low_level' | 'success';
}

export const canEquipItem = (item: Weapon | Armor | Accessory | Consumable, slot: keyof Equipment, level: number): EquipResult => {

    const equippableTypes = ['weapon', 'armor', 'accessory'] as const;
    if (!equippableTypes.includes(item.type as 'weapon' | 'armor' | 'accessory')) {
        return { canEquip: false, reason: 'wrong_type' };
    }

    if (level < item.requiredLevel) {
        return { canEquip: false, reason: 'low_level' };
    }

    switch (slot) {
        case 'weapon_main':
        case 'weapon_off':
            if (item.type !== 'weapon') {
                return { canEquip: false, reason: 'wrong_type' };
            }
            break;
        case 'helmet':
        case 'chest':
        case 'gloves':
        case 'legs':
        case 'boots':
            if (item.type !== 'armor' || (item as Armor).slot !== slot) {
                return { canEquip: false, reason: 'wrong_type' };
            }
            break;
        case 'ring_1':
        case 'ring_2':
            if (item.type !== 'accessory' || !(item as Accessory).slot?.startsWith('ring')) {
                return { canEquip: false, reason: 'wrong_type' };
            }
            break;
        case 'amulet':
            if (item.type !== 'accessory' || (item as Accessory).slot !== 'amulet') {
                return { canEquip: false, reason: 'wrong_type' };
            }
            break;
        default:
            return { canEquip: false, reason: 'wrong_type' };
    }

    return { canEquip: true, reason: 'success' };
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