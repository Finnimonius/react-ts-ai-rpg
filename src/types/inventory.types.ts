import type { BaseStats } from "./character.types";

export type EquipmentSlot = 'helmet' | 'chest' | 'gloves' | 'legs' | 'boots' | 'amulet' | 'ring'
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type InventoryItemType = 'weapon' | 'armor' | 'accessory' | 'consumable' | 'shopItem' | 'quest';
export type AnyItem = Weapon | Armor | Accessory | Consumable | ShopItem;

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    type: InventoryItemType,
    rarity: Rarity,
    value: number,
    img: string,
}

export interface InventorySlot {
    itemId: string | null;
    quantity: number;
}

export interface Weapon extends InventoryItem {
    requiredLevel: number,
    damage: { min: number, max: number },
    stats: Partial<Record<keyof BaseStats, number>>,
    weaponType: string
}

export interface Armor extends InventoryItem {
    requiredLevel: number,
    defense: number,
    stats: Partial<Record<keyof BaseStats, number>>,
    armorType: string,
    slot: EquipmentSlot
}

export interface Accessory extends InventoryItem {
    requiredLevel: number,
    damage?: { min: number, max: number },
    stats: Partial<Record<keyof BaseStats, number>>,
    slot: EquipmentSlot
}

export interface Consumable extends InventoryItem {
    requiredLevel: number,
    effect: {
        type: 'HEAL' | 'MANA_RESTORE' | 'OUT_OF_COMBAT_HEAL';
        value: number;
    };
}

export interface ShopItem extends InventoryItem {
    category: string;
}

export interface Equipment {
    weapon_main: string | null;
    weapon_off: string | null;
    helmet: string | null;
    chest: string | null;
    gloves: string | null;
    legs: string | null;
    boots: string | null;
    ring_1: string | null;
    ring_2: string | null;
    amulet: string | null;
}

export interface EquipmentStats {
    stats: Partial<Record<keyof BaseStats, number>>;
    defense: number;
    damage: { min: number; max: number };
}