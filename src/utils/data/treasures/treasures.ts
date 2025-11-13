import type { TreasureContainer, TreasureType } from "../../../types/game.types";
import chest from '../../../assets/images/rewards/chest.png';
import large_chest from '../../../assets/images/rewards/large_chest.png';
import gemstones from '../../../assets/images/rewards/gemstones.png';
import bag from '../../../assets/images/rewards/bag.png';

export const treasures: Record<TreasureType, TreasureContainer> = {
  chest: {
    img: chest,
  },
  large_chest: {
    img: large_chest,
  },
  gemstones: {
    img: gemstones,
  },
  bag: {
    img: bag,
  },
};