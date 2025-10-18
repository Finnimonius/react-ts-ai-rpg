import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BaseStats, CharacterClass, DerivedStats } from '../types/character.types'
import type { Race } from '../types/character.types'
import type { CraftingMaterials, Currency } from '../types/currency.types'
import { getStartingEquipment, getStartingInventory } from '../utils/generators/items-builder'
import type { Equipment, InventorySlot } from '../types/inventory.types'

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
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      selectedClass: null,
      level: 1,
      experience: 0,

      currentStats: { strength: 0, dexterity: 0, intelligence: 0, wisdom: 0, constitution: 0, luck: 0 },
      derivedStats: {health: 0, mana: 0, attack: 0, defense: 0, critChance: 0, evasion: 0},
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

      inventory: [],

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
        const startingInventory = getStartingInventory(classData.id)

        set({
          selectedClass: classData,
          currentStats: classData.baseStats,
          learnedAbilities: classData.abilities.filter(a => a.level === 1).map(a => a.id),
          equipment: startingEquipment,
          inventory: startingInventory,
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

      reset: () => set({ selectedClass: null, selectedRace: null })
    }),
    {
      name: 'character-storage',
    }
  )
)