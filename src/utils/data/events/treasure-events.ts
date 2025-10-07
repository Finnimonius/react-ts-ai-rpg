export const treasureEvents = [
  {
    id: 'forgotten_chest',
    title: 'Забытый сундук',
    description: 'Вы нашли старый сундук, спрятанный в руинах.',
    container: ['chest', 'gemstones']
  },
  {
    id: 'smugglers_cache',
    title: 'Тайник контрабандистов',
    description: 'В дупле старого дуба спрятан мешок с сокровищами.',
    container: ['bag', 'gold_coins']
  }
] as const;