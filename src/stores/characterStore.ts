import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseStats, Character, CharacterClass, DerivedStats } from '../types/character.types'
import type { Background } from '../types/character.types'
import type { CraftingMaterials, Currency } from '../types/currency.types'
import { calculateEuqipmentStats, getStartingEquipment, getStartingInventory } from '../utils/generators/items-builder'
import type { AnyItem, Equipment, InventorySlot } from '../types/inventory.types'
import { characterApi } from '../services/character-service'

export const INVENTORY_SIZE = 14;

interface CharacterStore {
  selectedClass: CharacterClass | null;
  selectedBackground: Background | null;
  character: Character | null;
  isLoading: boolean;
  selectClass: (classData: CharacterClass) => void;
  selectBackground: (backgroundData: Background) => Promise<void>;

  level: number;
  currentStats: BaseStats;
  derivedStats: DerivedStats;
  avaliableStatsPoints: number;
  currency: Currency;
  craftingMaterials: CraftingMaterials;
  inventory: InventorySlot[];
  equipment: Equipment;
  learnedAbilities: string[];
  calculateDerivedStats: () => void;
  hasCharacter: () => boolean;
  addItemToInventory: (item: AnyItem) => void;
  reset: () => void;
  unequipItem: (equipmentSlot: keyof Equipment, inventoryIndex: number) => void;
  equipItem: (inventoryIndex: number, equipmentSlot: keyof Equipment) => void;
  moveInventoryItem: (fromIndex: number, toIndex: number) => void;
  swapEquipment: (fromSlot: keyof Equipment, toSlot: keyof Equipment) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      selectedClass: null,
      selectedBackground: null,
      character: null,
      isLoading: false,

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

      selectBackground: async (backgroundData) => {
        const { selectedClass } = get();

        if (!selectedClass) {
          throw new Error("Сначала выберите класс");
        }

        set({
          selectedBackground: backgroundData,
          isLoading: true,
        })

        try {
          const data = await characterApi.create({
            classId: selectedClass.id,
            backgroundId: backgroundData.id
          });

          set({
            character: data.character,
            isLoading: false
          });

        } catch (error) {
          set({
            isLoading: false,
            selectedBackground: null
          });
          throw error;
        }
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

      addItemToInventory: (item) => {
        const { inventory } = get();

        const existingSlotIndex = inventory.findIndex(slot => {
          return slot.item?.id === item.id && item.type === 'consumable'
        })

        if (existingSlotIndex !== -1) {
          const newInventory = [...inventory];
          newInventory[existingSlotIndex].quantity += 1;
          set({ inventory: newInventory });
          return
        }

        const emptySlotIndex = inventory.findIndex(slot => !slot.item);

        if (emptySlotIndex !== -1) {
          const newInventory = [...inventory]
          newInventory[emptySlotIndex] = { item, quantity: 1 };

          set({ inventory: newInventory });
        }

      },

      hasCharacter: () => {
        const { character } = get();
        return !!character;
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
        get().calculateDerivedStats();
      },

      reset: () => set({
        selectedClass: null,
        selectedBackground: null,
        character: null,
        level: 1,
      }),
    }),
    {
      name: 'character-storage',
    }
  )
)