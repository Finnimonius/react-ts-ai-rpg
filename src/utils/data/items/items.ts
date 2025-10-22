import type { AnyItem, InventoryItemType, Rarity } from "../../../types/inventory.types";
import { groupByRarity } from "../../generators/items-builder";
import { CONSUMABLES } from "./consumables";
import { SHOP_ITEMS } from "./shopItems";
import { WEAPONS } from "./weapons";

export const ALL_ITEMS_BY_TYPE_AND_RARITY: Record<InventoryItemType, Record<Rarity, AnyItem[]>> = {
    weapon: groupByRarity(WEAPONS),
    armor: { common: [], uncommon: [], rare: [], epic: [], legendary: [] },
    accessory: { common: [], uncommon: [], rare: [], epic: [], legendary: [] },
    consumable: groupByRarity(CONSUMABLES),
    shopItem: groupByRarity(SHOP_ITEMS),
    quest: { common: [], uncommon: [], rare: [], epic: [], legendary: [] }
}