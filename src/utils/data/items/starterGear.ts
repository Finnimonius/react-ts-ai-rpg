import type { ClassConfig, ClassId } from "../../../types/character.types";

export const STARTER_WEAPONS = {
  DAGGER: {
    id: 'starter_dagger',
    name: 'Базовый Кинжал',
    description: 'Простой, но острый кинжал для начинающих.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 15,
    damage: { min: 4, max: 8 },
    stats: { dexterity: 1 },
    weaponType: 'dagger'
  }
};

export const STARTER_ARMOR = {
  LEATHER_CAP: {
    id: 'leather_cap',
    name: 'Кожаный Капюшон',
    description: 'Капюшон из прочной кожи.',
    type: 'armor' as const,
    rarity: 'common' as const,
    value: 15,
    defense: 3,
    stats: { dexterity: 1 },
    armorType: 'light',
    slot: 'helmet' as const
  },

  LEATHER_ARMOR: {
    id: 'leather_armor',
    name: 'Кожаный Доспех',
    description: 'Легкий кожаный доспех.',
    type: 'armor' as const,
    rarity: 'common' as const,
    value: 35,
    defense: 6,
    stats: { dexterity: 2 },
    armorType: 'light',
    slot: 'chest' as const
  },

  LEATHER_GLOVES: {
    id: 'leather_gloves',
    name: 'Кожаные Перчатки',
    description: 'Прочные кожаные перчатки.',
    type: 'armor' as const,
    rarity: 'common' as const,
    value: 12,
    defense: 2,
    stats: { dexterity: 1 },
    armorType: 'light',
    slot: 'gloves' as const
  },

  LEATHER_PANTS: {
    id: 'leather_pants',
    name: 'Кожаные Штаны',
    description: 'Удобные кожаные штаны.',
    type: 'armor' as const,
    rarity: 'common' as const,
    value: 20,
    defense: 3,
    stats: { dexterity: 1 },
    armorType: 'light',
    slot: 'legs' as const
  },

  LEATHER_BOOTS: {
    id: 'leather_boots',
    name: 'Кожаные Сапоги',
    description: 'Тихие кожаные сапоги.',
    type: 'armor' as const,
    rarity: 'common' as const,
    value: 18,
    defense: 2,
    stats: { dexterity: 1 },
    armorType: 'light',
    slot: 'boots' as const
  }
};

export const STARTER_CONSUMABLES = {
  HEALTH_POTION: {
    id: 'health_potion',
    name: 'Зелье Здоровья',
    description: 'Восстанавливает 50 здоровья.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 25,
    effect: { type: 'HEAL' as const, value: 50 }
  },

  MANA_POTION: {
    id: 'mana_potion',
    name: 'Зелье Маны',
    description: 'Восстанавливает 30 маны.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 30,
    effect: { type: 'MANA_RESTORE' as const, value: 30 }
  },

  BASIC_FOOD: {
    id: 'basic_food',
    name: 'Простая Еда',
    description: 'Восстанавливает 20 здоровья вне боя.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 5,
    effect: { type: 'OUT_OF_COMBAT_HEAL' as const, value: 20 }
  }
};

export const classConfigs: Record<ClassId, ClassConfig> = {
  // === СЕРЫЙ СТРАННИК ===
  grey_wanderer: {
    equipment: {
      weapon_main: STARTER_WEAPONS.DAGGER,
      weapon_off: STARTER_WEAPONS.DAGGER,
      helmet: STARTER_ARMOR.LEATHER_CAP,
      chest: STARTER_ARMOR.LEATHER_ARMOR,
      gloves: STARTER_ARMOR.LEATHER_GLOVES,
      legs: STARTER_ARMOR.LEATHER_PANTS,
      boots: STARTER_ARMOR.LEATHER_BOOTS,
      ring_1: null,   
      ring_2: null,   
      amulet: null
    },
    inventory: [
      { item: STARTER_CONSUMABLES.HEALTH_POTION, quantity: 5 },
      { item: STARTER_CONSUMABLES.MANA_POTION, quantity: 3 },
      { item: STARTER_CONSUMABLES.BASIC_FOOD, quantity: 10 }
    ]
  },
};
