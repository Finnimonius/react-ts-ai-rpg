import type { BaseStats } from "./character.types";
import type { CombatRewardType } from "./combat.types";

export interface EnemyTemplate {
    id: string,
    name: string,
    description: string,
    type: 'normal' | 'elite' | 'boss',

    // Базовые множители
    stats: {
        health: number;
        strength: number,
        dexterity: number,
        intelligence: number,
        wisdom: number,
        constitution: number,
        luck: number
    },

    scaling: {
        health: number,
    },

    abilities: string[],

    loot: CombatRewardType

    experience: number,
    gold: { min: number, max: number },
    souls: { min: number, max: number },
}

// Экземпляр противника
export interface EnemyInstance {
    template: EnemyTemplate,
    level: number,
    currentHealth: number,
    maxHealth: number,
    stats: BaseStats
    abilities: EnemyAbility[],
    abilityCooldowns: Map<string, number>, // abilityId -> оставшиеся ходы
    experience: number,
    gold: number,
    souls: number
}

export interface EnemyAbility {
  id: string;
  name: string;
  description: string;
  type: 'attack' | 'debuff' | 'buff' | 'heal';
  cooldown: number; 
  chance: number; 
  
  effects: Array<{
    type: 'DAMAGE' | 'HEAL' | 'BUFF' | 'DEBUFF';
    target: 'player' | 'self';
    value?: number;
    stat?: keyof BaseStats; 
    duration?: number; 
  }>;
}