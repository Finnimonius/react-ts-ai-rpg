import { WEAPONS } from './weapons';
import { ARMOR } from './armor';
import { CONSUMABLES } from './consumables';
import type { AnyItem } from '../../../types/inventory.types';
import { STARTER_ACCESORIES, STARTER_ARMOR, STARTER_CONSUMABLES, STARTER_WEAPONS } from './starterGear';

export const itemsService = {
  getItemById(itemId: string): AnyItem | undefined {
    const allItems = [
      ...Object.values(WEAPONS),
      ...Object.values(ARMOR),
      ...Object.values(CONSUMABLES),
      ...Object.values(STARTER_WEAPONS),
      ...Object.values(STARTER_ARMOR),
      ...Object.values(STARTER_ACCESORIES),
      ...Object.values(STARTER_CONSUMABLES)
    ];
    return allItems.find(item => item.id === itemId);
  },

  getAllItems(): AnyItem[] {
    return [
      ...Object.values(WEAPONS),
      ...Object.values(ARMOR),
      ...Object.values(CONSUMABLES),
      ...Object.values(STARTER_WEAPONS),
      ...Object.values(STARTER_ARMOR),
      ...Object.values(STARTER_ACCESORIES),
      ...Object.values(STARTER_CONSUMABLES)
    ];
  }
}