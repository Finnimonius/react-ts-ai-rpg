import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Class } from '../types/character.types'
import type { Race } from '../types/character.types'

interface CharacterStore {
  selectedClass: Class | null,
  selectedRace: Race | null,
  selectClass: (classData: Class) => void,
  selectRace: (raceData: Race) => void,
  getCharacter: () => {class: Class, race: Race, name: string, level: number} | null,
  hasCharacter: () => boolean,
  reset: () => void,
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      selectedClass: null,
      selectedRace: null,
      
      selectClass: (classData) => set({ selectedClass: classData }),
      selectRace: (raceData) => set({ selectedRace: raceData }),
      
      getCharacter: () => {
        const { selectedClass, selectedRace } = get()
        if (!selectedClass || !selectedRace) return null
        
        return {
          class: selectedClass,
          race: selectedRace,
          name: `${selectedRace.name} ${selectedClass.name}`,
          level: 1
        }
      },
      
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