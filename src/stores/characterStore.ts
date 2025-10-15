import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Class } from '../types/character.types'
import type { Race } from '../types/character.types'

interface CharacterStore {
  selectedClass: Class | null,
  selectedRace: Race | null,
  selectClass: (classData: Class) => void,
  selectRace: (raceData: Race) => void,
  // getCharacter: () => {class: Class, race: Race, name: string, level: number} | null,
  hasCharacter: () => boolean,
  reset: () => void,
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      selectedClass: null,
      
      selectClass: (classData) => set({ selectedClass: classData }),


      // Выбор рассы переделать в background
      selectedRace: null,
      selectRace: (raceData) => set({ selectedRace: raceData }),
      
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