// import warriorImg from '../../assets/images/characters/classes/warrior.png'
import hunterImg from '../../assets/images/characters/classes/hunter.png'
// import banditImg from '../../assets/images/characters/classes/bandit.png'
// import witchhunterImg from '../../assets/images/characters/classes/witchhunter.png'
// import warlord from '../../assets/images/characters/classes/warlord.png'

export const CLASSES = [
    {
    id: 'grey_wanderer',
    name: 'Серый странник',
    description: 'Мастер скрытности и манипуляций, использующий иллюзии и хитрость',
    img: hunterImg,

    baseStats: {
      strength: 8,
      dexterity: 16,
      intelligence: 12,
      wisdom: 10,
      constitution: 10,
      luck: 14
    },

    weponTypes: ['dagger', 'short_sword', 'crossbow'],
    armorTypes: ['light', 'cloth'],
    resource: 'leads',

    abilities: [
      {
        id: 'stealth_strike',
        name: 'Скрытый удар',
        description: 'Быстрая атака с шансом получить улику',
        level: 1,
        cost: { ap: 50 },
        type: 'damage',
      },
      {
        id: 'precise_strike',
        name: 'Меткий Выпад',
        description: 'Точный удар с увеличенным шансом крита',
        level: 3,
        cost: { ap: 60 },
        type: 'damage'
      },
      {
        id: 'distracting_move',
        name: 'Отвлекающий Маневр',
        description: 'Оглушает врага на 1 ход',
        level: 5,
        cost: { ap: 40, mana: 15 },
        type: 'utility'
      }
    ]
  }
  // {
  //   id: 'bandit',
  //   name: 'Бандит',
  //   description: 'Хитрый и беспринципный боец, мастер нечестных приемов и внезапных нападений.',
  //   xp: 0,
  //   hp: 8,
  //   primaryAbility: 'dexterity',
  //   skills: ['Обман', 'Ловкость рук', 'Скрытность', 'Запугивание'],
  //   features: ['Грязный прием', 'Внезапное нападение', 'Быстрое исчезновение', 'Карманная кража'],
  //   img: banditImg
  // },
  // {
  //   id: 'witchhunter',
  //   name: 'Охотник на ведьм',
  //   description: 'Безжалостный искатель магических угроз, вооруженный знаниями и стальной волей.',
  //   xp: 0,
  //   hp: 8,
  //   primaryAbility: 'wisdom',
  //   skills: ['Проницательность', 'Расследование', 'Магия', 'Убеждение'],
  //   features: ['Магическое сопротивление', 'Разрушение чар', 'Божественный суд', 'Охота на колдунов'],
  //   img: witchhunterImg
  // },
  // {
  //   id: 'warlord',
  //   name: 'Военачальник',
  //   description: 'Тактический гений и харизматичный лидер, вдохновляющий союзников на поле боя и координирующий сложные маневры.',
  //   xp: 0,
  //   hp: 10,
  //   primaryAbility: 'charisma',
  //   skills: ['Тактика', 'Убеждение', 'Запугивание', 'История', 'Атлетика'],
  //   features: [
  //     'Боевой приказ',
  //     'Тактическое превосходство',
  //     'Вдохновляющее присутствие',
  //     'Координация атаки',
  //     'Стратегическое планирование'
  //   ],
  //   img: warlord
  // },
  // {
  //   id: 'warrior',
  //   name: 'Воин',
  //   description: 'Мастер ближнего боя, непоколебимый защитник и символ стойкости на поле брани.',
  //   xp: 0,
  //   hp: 12,
  //   primaryAbility: 'strength',
  //   skills: ['Атлетика', 'Запугивание', 'Выживание', 'Тактика'],
  //   features: ['Боевая ярость', 'Несокрушимая стойкость', 'Щитовой удар'],
  //   img: warriorImg
  // },
] as const;