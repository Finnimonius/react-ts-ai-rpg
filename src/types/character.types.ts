import type { BACKGROUNDS } from "../utils/characterData/backgrounds";
import type { CraftingMaterials, Currency } from "./currency.types";
import type { Equipment, InventorySlot } from "./inventory.types";

export type Background = typeof BACKGROUNDS[number]

export interface BaseStats {
    strength: number,
    dexterity: number,
    intelligence: number,
    wisdom: number,
    constitution: number,
    luck: number
}

export interface DerivedStats {
    health: number,
    maxHealth: number,
    mana: number,
    maxMana: number,
    attackMin: number,
    attackMax: number,
    defense: number,
    critChance: number,
    evasion: number,
}

export interface ClassAbility {
    id: string,
    // name: string,
    // description: string,
    level: number,
    // cost: {
    //     ap: number,
    //     mana?: number,
    //     leads?: number
    // },
    // type: 'damage' | 'utility' | 'passive'
}

export type ClassId = 'grey_wanderer';

export interface ClassConfig {
    equipment: Equipment;
    inventory: InventorySlot[];
}

export interface CharacterClass {
    id: ClassId,
    name: string,
    description: string,
    img: string,
    baseStats: BaseStats,
    levelUpStats: Partial<BaseStats>,
    weaponTypes: string[],
    armorTypes: string[],
    resource: 'mana' | 'leads'  // Обновить по мере добавления новых классов
    abilities: ClassAbility[]
}

export interface Character {
    _id?: string,
    userId: string,
    classId: string,
    backgroundId: string,
    level: number,
    stats: BaseStats,
    derivedStats: DerivedStats,
    avaliableStatsPoints: number,
    currency: Currency,
    craftingMaterials: CraftingMaterials,
    inventory: InventorySlot[],
    equipment: Equipment,
    learnedAbilities: string[]
}
