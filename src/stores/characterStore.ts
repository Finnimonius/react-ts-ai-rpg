import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseStats, CharacterClass, DerivedStats } from '../types/character.types'
import type { Race } from '../types/character.types'
import type { CraftingMaterials, Currency } from '../types/currency.types'
import { calculateEuqipmentStats, getStartingEquipment, getStartingInventory } from '../utils/generators/items-builder'
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
  calculateDerivedStats: () => void,
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
      derivedStats: { health: 0, maxHealth: 0, mana: 0, maxMana: 0, attackMin: 0, attackMax: 0, defense: 0, critChance: 0, evasion: 0 },
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

        get().calculateDerivedStats()
      },

      calculateDerivedStats: () => {
        const { equipment, level, currentStats } = get();

        const equipmentStats = calculateEuqipmentStats(equipment);

        const totalStats: BaseStats = {
          strength: currentStats.strength + (equipmentStats.stats.strength || 0),
          dexterity: currentStats.dexterity + (equipmentStats.stats.dexterity || 0),
          intelligence: currentStats.intelligence + (equipmentStats.stats.intelligence || 0),
          wisdom: currentStats.wisdom + (equipmentStats.stats.wisdom || 0),
          constitution: currentStats.constitution + (equipmentStats.stats.constitution || 0),
          luck: currentStats.luck + (equipmentStats.stats.luck || 0),
        }

        const derived = {
          health: Math.round(50 + (level * 5) + (totalStats.constitution)),
          maxHealth: Math.round(50 + (level * 5) + (totalStats.constitution)),
          mana: Math.round(30 + (totalStats.intelligence * 2) + (totalStats.wisdom * 1)),
          maxMana: Math.round(30 + (totalStats.intelligence * 2) + (totalStats.wisdom * 1)),
          attackMin: Math.round(equipmentStats.damage.min + (totalStats.dexterity * 0.3)),
          attackMax: Math.round(equipmentStats.damage.max + (totalStats.dexterity * 0.3)),
          defense: Math.round(equipmentStats.defense + (totalStats.dexterity * 0.2)),
          critChance: Math.round(5 + (totalStats.dexterity * 0.2) + (totalStats.luck * 0.1)),
          evasion: Math.round(10 + (totalStats.dexterity * 0.4) + (totalStats.luck * 0.2)),
        }

        set({ derivedStats: derived });
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
        get().calculateDerivedStats();
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
        get().calculateDerivedStats();
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