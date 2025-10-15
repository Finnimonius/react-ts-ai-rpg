import type { BaseStats } from "./character.types";

export type EquipmentSlot = 'helmet' | 'chest' | 'gloves' | 'legs' | 'boots' | 'amulet' | 'ring'

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest',
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary',
    value: number,
}

export interface Weapon extends InventoryItem {
    damage: {min: number, max: number},
    stats: Partial<Record<keyof BaseStats, number>>,
    weaponType: string
}

export interface Armor extends InventoryItem {
    defense: number,
    stats: Partial<Record<keyof BaseStats, number>>,
    armorType: string,
    slot: EquipmentSlot
}

export interface Accessory extends InventoryItem {    // В разработке
    slot: EquipmentSlot
}

export interface Equipment {
    weapon_main: Weapon | null,
    weapon_off: Weapon | null,
    helmet: Armor | null,
    chest: Armor | null,
    gloves: Armor | null,
    legs: Armor | null,
    boots: Armor | null,
    ring_1: Accessory | null;
    ring_2: Accessory | null;
    amulet: Accessory | null;
}