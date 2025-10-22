import type { GameHistory } from "../../../../types/game.types"
import { NavigationButton } from "../../Game-UI/ActionButtons"
import './TreasureEvent.css'

interface LocationProp {
    history: GameHistory
}

export default function TreasureEvent({ history }: LocationProp) {
    const { aiText } = history
    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr" style={{ fontSize: 23}}>Выбрать награду:</p>
            <div className="treasure-buttons-wrapper">
                {/* {history.currentEvent?.items.map(item => <NavigationButton descr={item} onClick={() => {}}/>)} */}
                <img src={history.currentEvent?.img} alt="" style={{width: 40, height: 40}}/>
            </div>
        </div>
    )
}