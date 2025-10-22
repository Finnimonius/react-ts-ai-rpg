import health_flask from '../../../assets/images/items/consumables/health_flask.png';
import mana_flask from '../../../assets/images/items/consumables/mana_flask.png';
import basic_food from '../../../assets/images/items/consumables/basic_food.png';

export const CONSUMABLES = {
  HEALTH_POTION: {
    id: 'health_potion',
    name: 'Зелье Здоровья',
    description: 'Восстанавливает 50 здоровья.',
    type: 'consumable' as const,
    rarity: 'common' as const,
    value: 25,
    img: health_flask,
    requiredLevel: 1,
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
    requiredLevel: 1,
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
    requiredLevel: 1,
    effect: { type: 'OUT_OF_COMBAT_HEAL' as const, value: 20 }
  }
};