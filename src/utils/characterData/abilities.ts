interface Ability {
  id: string;
  name: string;
  description: string;
  cost: {
    ap: number;
    mana?: number;
    leads?: number;
  };
  cooldown?: number;
  requirements?: {
    level: number;
    subclass?: string;
  };
}

export const GREY_WANDERER_ABILITIES: Ability[] = [
  {
    id: 'stealth_strike',
    name: 'Скрытный Удар',
    description: 'Быстрая атака из тени с шансом получить Улику',
    type: 'damage',
    cost: { ap: 50 },
    damage: {
      base: 0,
      multiplier: 1.1,      
      isWeapon: true
    },
    effects: [
      { type: 'ADD_LEADS', value: 1, chance: 0.3 }
    ]
  },

  {
    id: 'precise_strike', 
    name: 'Меткий Выпад',
    description: 'Точный удар с увеличенным шансом критического попадания',
    type: 'damage',
    cost: { ap: 60 },
    damage: {
      base: 0,
      multiplier: 1.3,       
      isWeapon: true
    },
    effects: [
      { type: 'SELF_BUFF', stat: 'critChance', value: 25, duration: 1 }
    ]
  },

  {
    id: 'distracting_move',
    name: 'Отвлекающий Маневр',
    description: 'Оглушает врага на 1 ход',
    type: 'utility', 
    cost: { ap: 40, mana: 15 },
    effects: [
      { type: 'STUN', duration: 1 }
    ]
  }
];