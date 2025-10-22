import { useState } from "react";
import type { GameHistory } from "../../../../types/game.types"
import './TreasureEvent.css'
import DraggableItem from "../../Character/DraggableItem";
import { useCharacterStore } from "../../../../stores/characterStore";

interface LocationProp {
    history: GameHistory
}

export default function TreasureEvent({ history }: LocationProp) {
    const { aiText } = history;
    const [visible, setVisible] = useState(false)
    const { addItemToInventory } = useCharacterStore()

    const handleClick = () => {
        setVisible(true);
    }

    const handleTakeItem = () => {
        if (history.currentEvent?.reward) {
            addItemToInventory(history.currentEvent.reward);
            // setVisible(false);
        }
    }

    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr treasure-message-descr-find">Вы находите:</p>
            <div className="treasure-buttons-wrapper">
                <button className="treasure-reward-btn" onClick={handleClick}>
                    <img className="treasure-reward-img" src={history.currentEvent?.img} alt={history.currentEvent?.eventType} />
                </button>
                {visible && history.currentEvent?.reward && (
                    <div onClick={handleTakeItem}>
                        <DraggableItem
                            item={history.currentEvent?.reward}
                            location="treasure-reward"
                        />
                    </div>
                )
                }
            </div>
        </div>
    )
}