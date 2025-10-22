import type { TreasureContainer, TreasureType } from "../../../types/game.types";
import chest from '../../../assets/images/rewards/chest.png';
import large_chest from '../../../assets/images/rewards/large_chest.png';
import gemstones from '../../../assets/images/rewards/gemstones.png';
import bag from '../../../assets/images/rewards/bag.png';


export const TREASURES_ITEM_IMAGES = {
  chest: chest,
  large_chest: large_chest,
  gemstones: gemstones,
  bag: bag,
};

export const treasures: Record<TreasureType, TreasureContainer> = {
  chest: {
    img: '',
    rewards: [
      { type: 'weapon', chance: 30 },
      { type: 'consumable', chance: 50 },
      { type: 'shopItem', category: 'any', chance: 20 },
    ],
  },
  large_chest: {
    img: '',
    rewards: [
      { type: 'weapon', chance: 30 },
      { type: 'consumable', chance: 50 },
      { type: 'shopItem', category: 'any', chance: 20 },
    ],
  },
  gemstones: {
    img: '',
    rewards: [
      { type: 'shopItem', category: 'gemstones', chance: 100 },
    ],
  },
  bag: {
    img: '',
    rewards: [
      { type: 'shopItem', category: 'gold', chance: 100 },
      { type: 'consumable', chance: 50 },
    ],
  },
};