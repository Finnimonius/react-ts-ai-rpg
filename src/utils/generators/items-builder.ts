import type { ClassId } from "../../types/character.types";
import type { Accessory, Armor, Consumable, Equipment, InventorySlot, Weapon } from "../../types/inventory.types";
import { classConfigs } from "../data/items/starterGear";

export const getStartingEquipment = (classId: ClassId): Equipment => {
    return classConfigs[classId].equipment;
};

export const getStartingInventory = (classId: ClassId): InventorySlot[] => {
    return classConfigs[classId].inventory;
};

export const canEquipItem = (item: Weapon | Armor | Accessory | Consumable, slot: keyof Equipment): boolean => {
        if (item.type === 'consumable' || item.type === 'material' || item.type === 'quest') {
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
