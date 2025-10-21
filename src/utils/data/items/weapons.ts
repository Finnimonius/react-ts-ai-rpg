export const WEAPONS = {
    KUKRI: {
    id: 'kukri',
    name: 'Кукри',
    description: 'Изогнутый нож с расширенным лезвием, наносящий глубокие режущие раны.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 50,
    img: 'kukri',
    damage: { min: 7, max: 12 },
    stats: { strength: 2, dexterity: 1 },
    weaponType: 'knife'
  }
}