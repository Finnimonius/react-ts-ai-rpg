import { useGameStore } from '../../../stores/gameStore'
import './Location.css'

export default function Location() {
    const {aiText, gameHistory} = useGameStore()
    
    return (
        <div className="location-message-block">
            <p className='location-message-descr'>
                {aiText}
            </p>
        </div>
    )
}