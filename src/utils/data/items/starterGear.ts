import type { ClassConfig, ClassId } from "../../../types/character.types";
import starter_dagger from '../../../assets/images/items/weapons/starter_dagger.png';
import leather_armor from '../../../assets/images/items/armor/leather_armor.png';
import leather_cap from '../../../assets/images/items/armor/leather_cap.png';
import leather_gloves from '../../../assets/images/items/armor/leather_gloves.png';
import leather_pants from '../../../assets/images/items/armor/leather_pants.png';
import leather_boots from '../../../assets/images/items/armor/leather_boots.png';
import health_flask from '../../../assets/images/items/consumables/health_flask.png';
import mana_flask from '../../../assets/images/items/consumables/mana_flask.png';
import basic_food from '../../../assets/images/items/consumables/basic_food.png';

export const STARTER_WEAPONS = {
  DAGGER: {
    id: 'starter_dagger',
    name: 'Базовый Кинжал',
    description: 'Простой, но острый кинжал для начинающих.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 15,
    img: starter_dagger,
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
    img: leather_cap,
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
    img: leather_armor,
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
    img: leather_gloves,
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
    img: leather_pants,
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
    img: leather_boots,
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
    img: health_flask,
    effect: { type: 'HEAL' as const, value: 50 }
  },

  MANA_POTION: {
    id: 'mana_potion',
    name: 'Зелье Маны',
    description: 'Восстанавливает 30 маны.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 30,
    img: mana_flask,
    effect: { type: 'MANA_RESTORE' as const, value: 30 }
  },

  BASIC_FOOD: {
    id: 'basic_food',
    name: 'Простая Еда',
    description: 'Восстанавливает 20 здоровья вне боя.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 5,
    img: basic_food,
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
