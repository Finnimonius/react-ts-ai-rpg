import { RACES } from '../utils/characterData/races'
import { useCharacterStore } from '../stores/characterStore'
import './RaceSelection.css'

export default function RaceSelection({ onNext }) {
    const { selectRace } = useCharacterStore()

    const handleSelectRace = (dataRace) => {
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