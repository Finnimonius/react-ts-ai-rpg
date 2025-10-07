import type { GameHistory } from "../../../../stores/gameStore"
import './TreasureEvent.css'

interface LocationProp {
    history: GameHistory
}

export default function TreasureEvent({ history }: LocationProp) {
    const { aiText } = history
    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
        </div>
    )
}