export const RACES = [
  {
    id: 'human',
    name: 'Человек',
    description: 'Адаптируемые и амбициозные. Люди разнообразны в своих стремлениях, обычаях и внешности.',
    abilityBonuses: { strength: 1, dexterity: 1, constitution: 1, intelligence: 1, wisdom: 1, charisma: 1 },
    speed: 30,
    features: ['Универсальная подготовка']
  },
  {
    id: 'elf',
    name: 'Эльф', 
    description: 'Грациозные и магические существа, живущие в гармонии с природой.',
    abilityBonuses: { dexterity: 2 },
    speed: 30,
    features: ['Темное зрение', 'Острое восприятие']
  },
  {
    id: 'dwarf',
    name: 'Дварф',
    description: 'Выносливые и упрямые мастера подземелий и кузнечного дела.',
    abilityBonuses: { constitution: 2 },
    speed: 25,
    features: ['Темное зрение', 'Сопротивление яду']
  },
  {
    id: 'halfling',
    name: 'Халфлинг',
    description: 'Маленькие и проворные существа, любящие уют и приключения.',
    abilityBonuses: { dexterity: 2 },
    speed: 25,
    features: ['Удачливый', 'Храбрый']
  }
]