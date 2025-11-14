import type { AnyItem, InventoryItemType, Rarity } from "../../../types/inventory.types";
import { groupByRarity } from "../../generators/items-builder";
import { ARMOR } from "./armor";
import { CONSUMABLES } from "./consumables";
import { SHOP_ITEMS } from "./shopItems";
import { STARTER_ACCESORIES, STARTER_ARMOR, STARTER_CONSUMABLES, STARTER_WEAPONS } from "./starterGear";
import { WEAPONS } from "./weapons";

export const ALL_ITEMS_BY_TYPE_AND_RARITY: Record<InventoryItemType, Record<Rarity, AnyItem[]>> = {
    weapon: groupByRarity(WEAPONS),
    armor: groupByRarity(ARMOR),
    accessory: { common: [], uncommon: [], rare: [], epic: [], legendary: [] },
    consumable: groupByRarity(CONSUMABLES),
    shopItem: groupByRarity(SHOP_ITEMS),
    quest: { common: [], uncommon: [], rare: [], epic: [], legendary: [] }
}

export const STARTER_ITEMS_ARRAY = [
    ...Object.values(STARTER_WEAPONS),
    ...Object.values(STARTER_ARMOR),
    ...Object.values(STARTER_ACCESORIES),
    ...Object.values(STARTER_CONSUMABLES),
];

export const ALL_ITEMS = [
    ...Object.values(WEAPONS),
    ...Object.values(ARMOR),
    ...Object.values(CONSUMABLES),
    ...Object.values(SHOP_ITEMS),
    ...STARTER_ITEMS_ARRAY
]