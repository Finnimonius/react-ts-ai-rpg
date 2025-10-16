import type { ClassId } from "../../types/character.types";
import type { Equipment } from "../../types/inventory.types";
import { classConfigs } from "../data/items/starterGear";

export const getStartingEquipment = (classId: ClassId): Equipment => {
    return classConfigs[classId].equipment; 
};