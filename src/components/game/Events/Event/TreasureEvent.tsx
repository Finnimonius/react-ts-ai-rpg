import { useState } from "react";
import type { GameHistory } from "../../../../types/game.types"
import './TreasureEvent.css'
import DraggableItem from "../../Character/DraggableItem";

interface LocationProp {
    history: GameHistory
}

export default function TreasureEvent({ history }: LocationProp) {
    const { aiText } = history;
    const [visible, setVisible] = useState(false)

    const handleClick = () => {
        setVisible(true);
    }

    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr treasure-message-descr-find">Вы находите:</p>
            <div className="treasure-buttons-wrapper">
                {/* {history.currentEvent?.items.map(item => <NavigationButton descr={item} onClick={() => {}}/>)} */}
                <button className="treasure-reward-btn" onClick={handleClick}>
                    <img className="treasure-reward-img" src={history.currentEvent?.img} alt={history.currentEvent?.eventType} />
                </button>
                {visible && history.currentEvent?.reward && (
                    <DraggableItem
                        item={history.currentEvent?.reward}
                        location="treasure-reward"
                    />
                )
                }
            </div>
        </div>
    )
}