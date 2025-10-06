import './GameStart.css'

type GameMainProps = {
    onStartCreation: () => void
}

export default function GameMain({ onStartCreation }: GameMainProps) {
    return (
        <div className='game-main-container'>
            <button className='hero-btn' onClick={onStartCreation}>Начать путешествие</button>
        </div>
    )
}
