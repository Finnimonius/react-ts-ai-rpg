import { CONSUMABLES } from "./consumables";
import { SHOP_ITEMS } from "./shopItems";
import { WEAPONS } from "./weapons";

export const ALL_ITEMS = {
    ...WEAPONS,
    ...CONSUMABLES,
    ...SHOP_ITEMS
}