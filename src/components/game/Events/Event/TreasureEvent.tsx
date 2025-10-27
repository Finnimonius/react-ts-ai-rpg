import type { GameHistory } from "../../../../types/game.types";
import './TreasureEvent.css'
import DraggableItem from "../../Character/DraggableItem";
import { useCharacterStore } from "../../../../stores/characterStore";
import { NavigationButton } from "../../Game-UI/ActionButtons";
import { useGameStore } from "../../../../stores/gameStore";

interface LocationProp {
    history: GameHistory
}


export default function TreasureEvent({ history }: LocationProp) {
    const { aiText, currentEvent } = history;
    const { addItemToInventory } = useCharacterStore();
    const { updateEventTakenStatus, updateEventOpenedStatus } = useGameStore();

    const handleClick = () => {
        updateEventOpenedStatus()
    }

    const handleTakeItem = () => {
        if (currentEvent?.reward && currentEvent.id) {
            addItemToInventory(currentEvent.reward);
            updateEventTakenStatus()
        }
    }

    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr treasure-message-descr-find">Вы находите:</p>
            <div className="treasure-buttons-wrapper">
                <button className="treasure-reward-btn" onClick={handleClick} disabled={currentEvent?.isTaken}>
                    <img className="treasure-reward-img" src={currentEvent?.img} alt={currentEvent?.eventType} />
                </button>
                {currentEvent?.isOpened && currentEvent?.reward && (
                    <div className="treasure-reward-wrapper">
                        <div onClick={handleTakeItem}>
                            <DraggableItem
                                item={currentEvent?.reward}
                                location="treasure-reward"
                            />
                        </div>
                        <NavigationButton descr={'Отправиться дальше'} onClick={() => ''} />
                    </div>
                )
                }
                {currentEvent?.isTaken && <p className="treasure-message-descr treasure-message-descr-find">Вы получили награду !</p>}
            </div>
        </div>
    )
}