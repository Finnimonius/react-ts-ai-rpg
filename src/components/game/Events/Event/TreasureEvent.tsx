import type { GameHistory } from "../../../../types/game.types";
import './TreasureEvent.css'
import DraggableItem from "../../Character/DraggableItem";
import { useCharacterStore } from "../../../../stores/characterStore";
import { NavigationButton } from "../../Game-UI/ActionButtons";
import { treasures } from "../../../../utils/data/treasures/treasures";
import { useGameStore } from "../../../../stores/gameStore";
import { ALL_ITEMS } from "../../../../utils/data/items/items";

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

    const reward = ALL_ITEMS.find(item => item.id === currentEvent?.reward.id);
    if (!reward) throw new Error("Предмет не найден");

    const handleTakeItem = () => {
        addItemToInventory(reward.id, 1);
        updateEventTakenStatus()
    }


    return (
        <div>
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr treasure-message-descr-find">Вы находите:</p>
            <div className="treasure-buttons-wrapper">
                <button className="treasure-reward-btn" onClick={handleClick} disabled={currentEvent?.isTaken}>
                    <img className="treasure-reward-img" src={treasures[currentEvent?.rewardBox].img} alt={currentEvent?.eventType} />
                </button>
                {currentEvent?.isOpened && (
                    <div className="treasure-reward-wrapper">
                        {!currentEvent?.isTaken && (
                            <div onClick={handleTakeItem}>
                                <DraggableItem
                                    item={reward}
                                    location="treasure-reward"
                                />
                            </div>
                        )}
                        {currentEvent?.isTaken && <p className="treasure-message-descr treasure-message-descr-find">Вы получили награду !</p>}
                        <NavigationButton descr={'Отправиться дальше'} onClick={() => ''} />
                    </div>
                )
                }
            </div>
        </div>
    )
}