import { create } from 'zustand';
import type { Character, CharacterClass } from '../types/character.types';
import type { Background } from '../types/character.types';
import type { AnyItem, Equipment } from '../types/inventory.types';
import { characterApi } from '../services/character-service';
import { CLASSES } from '../utils/characterData/classes';
import { BACKGROUNDS } from '../utils/characterData/backgrounds';

interface CharacterStore {
  selectedClass: CharacterClass | null;
  selectedBackground: Background | null;
  character: Character | null;
  isLoading: boolean;
  loadCharacter: () => Promise<void>;
  selectClass: (classData: CharacterClass) => void;
  selectBackground: (backgroundData: Background) => Promise<void>;
  addItemToInventory: (item: AnyItem) => void;
  equipItem: (inventoryIndex: number, equipmentSlot: keyof Equipment) => Promise<void>;
  unequipItem: (equipmentSlot: keyof Equipment, inventoryIndex: number) => Promise<void>;
  moveInventoryItem: (fromIndex: number, toIndex: number) => Promise<void>;
  swapEquipment: (fromSlot: keyof Equipment, toSlot: keyof Equipment) => Promise<void>;
  hasCharacter: () => boolean;
  reset: () => Promise<void>;
}

export const useCharacterStore = create<CharacterStore>()(
  (set, get) => ({
    selectedClass: null,
    selectedBackground: null,
    character: null,
    isLoading: false,

    loadCharacter: async () => {
      set({ isLoading: true });
      try {
        const response = await characterApi.get();
        const character = response.character;

        if (character) {
          const characterClass = CLASSES.find(c => c.id === character.classId);
          const characterBackground = BACKGROUNDS.find(b => b.id === character.backgroundId);

          set({
            character: character,
            selectedClass: characterClass || null,
            selectedBackground: characterBackground || null,
            isLoading: false
          });
        } else {
          set({
            character: null,
            isLoading: false
          });
        }
      } catch {
        set({
          character: null,
          isLoading: false
        });
      }
    },

    selectClass: (classData) => {
      set({
        selectedClass: classData
      });
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
        const response = await characterApi.create({
          classId: selectedClass.id,
          backgroundId: backgroundData.id
        });

        set({
          character: response.character,
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

    addItemToInventory: (item: AnyItem) => {
      const { character } = get();
      if (!character) return;

      const updatedInventory = [...character.inventory];

      const existingSlotIndex = updatedInventory.findIndex(slot => {
        return slot.itemId === item.id && item.type === 'consumable'
      });

      if (existingSlotIndex !== -1) {
        updatedInventory[existingSlotIndex].quantity += 1;
      } else {
        const emptySlotIndex = updatedInventory.findIndex(slot => !slot.itemId);
        if (emptySlotIndex !== -1) {
          updatedInventory[emptySlotIndex] = { itemId: item.id, quantity: 1 };
        } else {
          return;
        }
      }

      set({
        character: {
          ...character,
          inventory: updatedInventory
        }
      });
    },

    hasCharacter: () => {
      const { character } = get();
      return !!character;
    },

    unequipItem: async (equipmentSlot: keyof Equipment, inventoryIndex: number) => {
      const { character } = get();

      if (!character) {
        throw new Error("Персонаж не найден");
      }

      const previousCharacter = { ...character };

      try {
        const equippedItemId = character.equipment[equipmentSlot];
        if (!equippedItemId) {
          throw new Error("В слоте нет предмета");
        }

        const targetSlot = character.inventory[inventoryIndex];
        if (targetSlot.itemId) {
          throw new Error("Целевой слот инвентаря занят");
        }

        const updatedEquipment = { ...character.equipment };
        const updatedInventory = [...character.inventory];

        updatedEquipment[equipmentSlot] = null;

        updatedInventory[inventoryIndex] = {
          itemId: equippedItemId,
          quantity: 1
        };

        set({
          character: {
            ...character,
            equipment: updatedEquipment,
            inventory: updatedInventory
          }
        });

        const response = await characterApi.unequip({ equipmentSlot, inventoryIndex });

        set({
          character: response.character
        });

      } catch (error) {
        set({
          character: previousCharacter
        });
        throw error;
      }
    },

    equipItem: async (inventoryIndex: number, equipmentSlot: keyof Equipment) => {
      const { character } = get();

      if (!character) {
        throw new Error("Персонаж не найден");
      }

      const previousCharacter = { ...character };

      try {
        const inventorySlot = character.inventory[inventoryIndex];
        if (!inventorySlot || !inventorySlot.itemId) {
          throw new Error("Предмет не найден в инвентаре");
        }

        const currentEquippedItemId = character.equipment[equipmentSlot];
        const updatedEquipment = { ...character.equipment };
        const updatedInventory = [...character.inventory];

        updatedEquipment[equipmentSlot] = inventorySlot.itemId;

        if (currentEquippedItemId) {
          updatedInventory[inventoryIndex] = {
            itemId: currentEquippedItemId,
            quantity: 1
          };
        } else {
          updatedInventory[inventoryIndex] = { itemId: null, quantity: 0 };
        }

        set({
          character: {
            ...character,
            equipment: updatedEquipment,
            inventory: updatedInventory
          }
        });

        const response = await characterApi.equip({ inventoryIndex, equipmentSlot });

        set({
          character: response.character
        });

      } catch (error) {
        set({
          character: previousCharacter
        });
        throw error;
      }
    },

    moveInventoryItem: async (fromIndex: number, toIndex: number) => {
      const { character } = get();

      if (!character) {
        throw new Error("Персонаж не найден");
      }

      const previousCharacter = { ...character };

      try {
        if (fromIndex < 0 || fromIndex >= character.inventory.length ||
          toIndex < 0 || toIndex >= character.inventory.length) {
          throw new Error("Неверный индекс инвентаря");
        }

        const fromSlot = character.inventory[fromIndex];
        if (!fromSlot || !fromSlot.itemId) {
          throw new Error("Предмет не найден в инвентаре");
        }

        const updatedInventory = [...character.inventory];
        const temp = updatedInventory[fromIndex];
        updatedInventory[fromIndex] = updatedInventory[toIndex];
        updatedInventory[toIndex] = temp;

        set({
          character: {
            ...character,
            inventory: updatedInventory
          }
        });

        const response = await characterApi.moveInventory({ fromIndex, toIndex });

        set({
          character: response.character
        });

      } catch (error) {
        set({
          character: previousCharacter
        });
        throw error;
      }
    },

    swapEquipment: async (fromSlot: keyof Equipment, toSlot: keyof Equipment) => {
      const { character } = get();

      if (!character) {
        throw new Error("Персонаж не найден");
      }

      const previousCharacter = { ...character };

      try {
        const fromItemId = character.equipment[fromSlot];
        const toItemId = character.equipment[toSlot];

        if (!fromItemId && !toItemId) {
          throw new Error("Оба слота пустые");
        }

        const updatedEquipment = { ...character.equipment };
        const temp = updatedEquipment[fromSlot];
        updatedEquipment[fromSlot] = updatedEquipment[toSlot];
        updatedEquipment[toSlot] = temp;

        set({
          character: {
            ...character,
            equipment: updatedEquipment
          }
        });

        const response = await characterApi.swapEquipment({ fromSlot, toSlot });

        set({
          character: response.character
        });

      } catch (error) {
        set({
          character: previousCharacter
        });
        throw error;
      }
    },

    reset: async () => {
      set({ isLoading: true });

      await characterApi.delete();

      set({
        selectedClass: null,
        selectedBackground: null,
        character: null,
        isLoading: false
      });
    },
  }
  )
)