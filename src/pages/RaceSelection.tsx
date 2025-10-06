import { RACES } from '../utils/characterData/races'
import { useCharacterStore } from '../stores/characterStore'
import './RaceSelection.css'
import type { Race } from '../types/character.types'

type RaceSelectionProps = {
    onNext: () => void,
}

export default function RaceSelection({ onNext }: RaceSelectionProps) {
    const { selectRace } = useCharacterStore()

    const handleSelectRace = (dataRace: Race) => {
        selectRace(dataRace)
        onNext()
    }

    return (
        <div className='race-container'>
            <ul>
                {RACES.map(race => {
                    return <li onClick={() => handleSelectRace(race)} key={race.id}>
                        <h3>{race.name}</h3>
                        <p>{race.description}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}