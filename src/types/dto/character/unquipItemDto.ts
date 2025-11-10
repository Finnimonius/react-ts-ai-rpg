import type { Equipment } from "../../inventory.types";

export interface UnequipItemDto {
    equipmentSlot: keyof Equipment,
    inventoryIndex: number
}