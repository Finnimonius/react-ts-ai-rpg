import type { Equipment } from "../inventory.types";

export interface SwapEquipmentDto {
    fromSlot: keyof Equipment;
    toSlot: keyof Equipment;
}