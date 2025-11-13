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
        <div className='background-container'>
            <ul className='background-list'>
                {BACKGROUNDS.map(background => {
                    return <li onClick={() => handleSelectRace(background)} key={background.id} className='background-list-item'>
                        <img src={background.img} alt="Изображение класса" className='class-img'/>
                        <h3 className='class-title'>{background.name}</h3>
                        <p className='class-descr'>{background.description}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}