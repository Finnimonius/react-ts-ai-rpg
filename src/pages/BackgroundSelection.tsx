import { BACKGROUNDS } from '../utils/characterData/backgrounds'
import { useCharacterStore } from '../stores/characterStore'
import './BackgroundSelection.css'
import type { Background } from '../types/character.types'
import PageLoader from '../components/UI/PageLoader'

type BackgroundSelectionProps = {
    onNext: () => void,
}

export default function BackgroundSelection({ onNext }: BackgroundSelectionProps) {
    const { selectBackground, isLoading } = useCharacterStore()

    const handleSelectRace = async (dataRace: Background) => {
        try {
            await selectBackground(dataRace)
            onNext()
        } catch (error) {
            console.error('Ошибка создания персонажа:', error);
        }
    }

    if (isLoading) {
        return <PageLoader />
    }

    return (
        <div className='race-container'>
            <ul>
                {BACKGROUNDS.map(background => {
                    return <li onClick={() => handleSelectRace(background)} key={background.id}>
                        <h3>{background.name}</h3>
                        <p>{background.description}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}