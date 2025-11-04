import grey_wanderer from '../../assets/images/characters/classes/grey-wanderer.png'

export const CLASSES = [
    {
    id: 'grey_wanderer' as const,
    name: 'Серый странник',
    description: 'Мастер скрытности и манипуляций, использующий иллюзии и хитрость',
    img: grey_wanderer,

    baseStats: {
      strength: 8,
      dexterity: 16,
      intelligence: 12,
      wisdom: 10,
      constitution: 10,
      luck: 14
    },

    levelUpStats: {
      dexterity: 1,
      luck: 0.5
    },

    weaponTypes: ['dagger', 'short_sword', 'crossbow'],
    armorTypes: ['light', 'cloth'],
    resource: 'leads' as const,

    abilities: [
      {
        id: 'stealth_strike',
        // name: 'Скрытый удар',
        // description: 'Быстрая атака с шансом получить улику',
        level: 1,
        // cost: { ap: 50 },
        // type: 'damage' as const,
      },
      {
        id: 'precise_strike',
        // name: 'Меткий Выпад',
        // description: 'Точный удар с увеличенным шансом крита',
        level: 3,
        // cost: { ap: 60 },
        // type: 'damage' as const
      },
      {
        id: 'distracting_move',
        // name: 'Отвлекающий Маневр',
        // description: 'Оглушает врага на 1 ход',
        level: 5,
        // cost: { ap: 40, mana: 15 },
        // type: 'utility' as const
      }
    ]
  }
];