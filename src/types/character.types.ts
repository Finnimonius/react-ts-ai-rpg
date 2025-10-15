import type { RACES } from "../utils/characterData/races";

export type Race = typeof RACES[number]

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
    mana: number,
    attack: number,
    defense: number,
    critChance: number,
    evasion: number,
}

export interface ClassAbility {
    id: string,
    name: string,
    description: string,
    level: number,
    cost: {           // Обновить по мере добавления новых классов
        ap: number,
        mana?: number,
        leads?: number
    },
    type: 'damage' | 'utility' | 'passive'
}

export interface CharacterClass {
    id: string,
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