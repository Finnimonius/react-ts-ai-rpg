import type { Equipment } from "../../inventory.types";


export interface EquipItemDto {
    inventoryIndex: number,
    equipmentSlot: keyof Equipment
}