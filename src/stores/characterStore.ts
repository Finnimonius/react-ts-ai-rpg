import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseStats, CharacterClass, DerivedStats } from '../types/character.types'
import type { Race } from '../types/character.types'
import type { CraftingMaterials, Currency } from '../types/currency.types'
import { getStartingEquipment, getStartingInventory } from '../utils/generators/items-builder'
import type { Equipment, InventorySlot } from '../types/inventory.types'

export const INVENTORY_SIZE = 14;

interface CharacterStore {
  selectedClass: CharacterClass | null,
  // Изменить на background
  selectedRace: Race | null,
  //------------------------
  level: number,
  currentStats: BaseStats,
  derivedStats: DerivedStats,
  avaliableStatsPoints: number,
  currency: Currency,
  craftingMaterials: CraftingMaterials,
  inventory: InventorySlot[],
  equipment: Equipment,
  learnedAbilities: string[],
  selectClass: (classData: CharacterClass) => void,
  selectRace: (raceData: Race) => void,
  hasCharacter: () => boolean,
  reset: () => void,
  unequipItem: (equipmentSlot: keyof Equipment, inventoryIndex: number) => void;
  equipItem: (inventoryIndex: number, equipmentSlot: keyof Equipment) => void;
  moveInventoryItem: (fromIndex: number, toIndex: number) => void;
  swapEquipment: (fromSlot: keyof Equipment, toSlot: keyof Equipment) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      selectedClass: null,
      level: 1,
      experience: 0,

      currentStats: { strength: 0, dexterity: 0, intelligence: 0, wisdom: 0, constitution: 0, luck: 0 },
      derivedStats: { health: 0, maxHealth: 0, mana: 0, maxMana: 0, attack: 0, defense: 0, critChance: 0, evasion: 0 },
      avaliableStatsPoints: 0,

      currency: {
        gold: 100,
        souls: 0,
        fame: 0,
      },

      craftingMaterials: {
        wood: 0,
        ore: 0,
        leather: 0,
        herbs: 0,
        crystals: 0,
        relics: 0
      },

      inventory: Array.from({ length: INVENTORY_SIZE }, () => ({ item: null, quantity: 0 })),

      equipment: {
        weapon_main: null,
        weapon_off: null,
        helmet: null,
        chest: null,
        gloves: null,
        legs: null,
        boots: null,
        ring_1: null,
        ring_2: null,
        amulet: null
      },

      learnedAbilities: [],


      selectClass: (classData) => {
        const startingEquipment = getStartingEquipment(classData.id);
        const startingInventory = getStartingInventory(classData.id);

        const emptyInventory = Array.from({ length: INVENTORY_SIZE }, (): InventorySlot => ({ item: null, quantity: 0 }));

        startingInventory.forEach((slot, index) => {
          if (index < 20) emptyInventory[index] = slot;
        });

        set({
          selectedClass: classData,
          currentStats: classData.baseStats,
          learnedAbilities: classData.abilities.filter(a => a.level === 1).map(a => a.id),
          equipment: startingEquipment,
          inventory: emptyInventory,
        });
      },


      // Выбор рассы переделать в background
      selectedRace: null,
      selectRace: (raceData) => set({ selectedRace: raceData }),
      //---------------------------------------------------------

      hasCharacter: () => {
        const { selectedClass, selectedRace } = get()
        return !!(selectedClass && selectedRace)
      },

      unequipItem: (equipmentSlot, inventoryIndex) => {
        const { equipment, inventory } = get();

        const item = equipment[equipmentSlot];
        if (!item) return;

        if (inventory[inventoryIndex].item) {
          return;
        }

        const newEquipment = { ...equipment, [equipmentSlot]: null };
        const newInventory = [...inventory];
        newInventory[inventoryIndex] = { item, quantity: 1 };

        set({ equipment: newEquipment, inventory: newInventory });
      },

      equipItem: (inventoryIndex, equipmentSlot) => {
        const { equipment, inventory } = get();

        const item = inventory[inventoryIndex].item;
        if (!item) return;

        const currentEquipped = equipment[equipmentSlot];

        const newEquipment = { ...equipment, [equipmentSlot]: item };
        const newInventory = [...inventory];

        if (currentEquipped) {
          newInventory[inventoryIndex] = { item: currentEquipped, quantity: 1 };
        } else {
          newInventory[inventoryIndex] = { item: null, quantity: 0 };
        }

        set({ equipment: newEquipment, inventory: newInventory });
      },

      moveInventoryItem: (fromIndex, toIndex) => {
        const { inventory } = get();

        const newInventory = [...inventory];
        const temp = newInventory[fromIndex];
        newInventory[fromIndex] = newInventory[toIndex];
        newInventory[toIndex] = temp;

        set({ inventory: newInventory });
      },

      swapEquipment: (fromSlot, toSlot) => {
        const { equipment } = get();

        const newEquipment: Equipment = {
          ...equipment,
          [fromSlot]: equipment[toSlot],
          [toSlot]: equipment[fromSlot]
        };

        set({ equipment: newEquipment });
      },
      
      reset: () => set({
        selectedClass: null,
        selectedRace: null,
        level: 1,
      }),
    }),
    {
      name: 'character-storage',
    }
  )
)