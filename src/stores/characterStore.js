import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCharacterStore = create(
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