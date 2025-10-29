import './GameStart.css'

type GameStartProps = {
    onStartCreation: () => void
}

export default function GameStart({ onStartCreation }: GameStartProps) {
    return (
        <div className='game-main-container'>
            <button className='hero-btn' onClick={onStartCreation}>Начать путешествие</button>
        </div>
    )
}
