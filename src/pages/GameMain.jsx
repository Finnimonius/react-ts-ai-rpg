import './GameMain.css'

export default function GameMain({ onStartCreation }) {
    return (
        <div className='game-main-container'>
            <button className='hero-btn' onClick={onStartCreation}>Начать путешествие</button>
        </div>
    )
}
