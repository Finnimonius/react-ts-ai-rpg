import type { TreasureContainer, TreasureType } from "../../../types/game.types";
import chest from '../../../assets/images/rewards/chest.png';
import large_chest from '../../../assets/images/rewards/large_chest.png';
import gemstones from '../../../assets/images/rewards/gemstones.png';
import bag from '../../../assets/images/rewards/bag.png';

export const treasures: Record<TreasureType, TreasureContainer> = {
  chest: {
    img: chest,
    rewards: [
      { type: 'weapon', chance: 30 },
      { type: 'armor', chance: 40 },
      { type: 'shopItem', category: 'any', chance: 20 },
    ],
  },
  large_chest: {
    img: large_chest,
    rewards: [
      { type: 'weapon', chance: 50 },
      { type: 'armor', chance: 50 },
    ],
  },
  gemstones: {
    img: gemstones,
    rewards: [
      { type: 'shopItem', category: 'gemstones', chance: 100 },
    ],
  },
  bag: {
    img: bag,
    rewards: [
      { type: 'shopItem', category: 'gold', chance: 100 },
      { type: 'consumable', chance: 50 },
    ],
  },
};