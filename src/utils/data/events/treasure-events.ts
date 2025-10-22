import type { TreasureEventData } from "../../../types/game.types";

export const treasureEvents: TreasureEventData[] = [
  {
    id: 'forgotten_chest',
    title: 'Забытый сундук',
    description: 'Вы нашли старый сундук, спрятанный в руинах.',
    container: ['chest', 'large_chest'] 
  },
  {
    id: 'smugglers_cache',
    title: 'Тайник контрабандистов',
    description: 'В дупле старого дуба спрятан мешок с сокровищами.',
    container: ['bag', 'gemstones']
  }
];