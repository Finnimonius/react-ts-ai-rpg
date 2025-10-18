import type { ClassId } from "../../types/character.types";
import type { Equipment, InventorySlot } from "../../types/inventory.types";
import { classConfigs } from "../data/items/starterGear";

export const getStartingEquipment = (classId: ClassId): Equipment => {
    return classConfigs[classId].equipment; 
};

export const getStartingInventory = (classId: ClassId): InventorySlot[] => {
    return classConfigs[classId].inventory; 
};