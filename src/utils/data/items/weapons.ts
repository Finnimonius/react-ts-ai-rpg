import kukri from '../../../assets/images/items/weapons/kukri.png';
import bowie_knife from '../../../assets/images/items/weapons/bowie_knife.png';

export const WEPAPON_ITEM_IMAGES = {
  kukri: kukri,
  bowie_knife: bowie_knife,
};


export const WEAPONS = {
    KUKRI: {
    id: 'kukri',
    name: 'Кукри',
    description: 'Изогнутый нож с расширенным лезвием, наносящий глубокие режущие раны.',
    type: 'weapon' as const,
    rarity: 'common' as const,
    value: 50,
    img: 'kukri',
    requiredLevel: 2,
    damage: { min: 5, max: 9 },
    stats: { strength: 2, dexterity: 1 },
    weaponType: 'knife'
  },
  BOWIE_KNIFE: {
    id: 'bowie_knife',
    name: 'Нож Боуи',
    description: 'Крепкий охотничий нож с клип-поинтом. Надежен в ближнем бою.',
    type: 'weapon' as const,
    rarity: 'uncommon' as const,
    value: 25,
    img: 'bowie_knife',
    requiredLevel: 3,
    damage: { min: 6, max: 10 },
    stats: { dexterity: 1 },
    weaponType: 'knife'
  },
}