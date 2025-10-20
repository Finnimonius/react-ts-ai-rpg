import type { BaseStats } from "./character.types";

export type EquipmentSlot = 'helmet' | 'chest' | 'gloves' | 'legs' | 'boots' | 'amulet' | 'ring'
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface InventoryItem {
    id: string,
    name: string,
    description: string,
    type: 'weapon' | 'armor' | 'consumable' | 'material' | 'quest',
    rarity: Rarity,
    value: number,
    img: string,
}

export interface InventorySlot {
    item: Weapon | Armor | Consumable | Accessory | null; 
    quantity: number;                 
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

export interface Consumable extends InventoryItem {
    type: 'consumable';
    effect: {
        type: 'HEAL' | 'MANA_RESTORE' | 'OUT_OF_COMBAT_HEAL';
        value: number;
    };
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

export interface EquipmentStats {
  stats: Partial<Record<keyof BaseStats, number>>;
  defense: number;
  damage: { min: number; max: number };
}