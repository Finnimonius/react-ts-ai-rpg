import type { GameHistory } from "../../../../types/game.types";
import './TreasureEvent.css'
import DraggableItem from "../../Character/DraggableItem";
import { useCharacterStore } from "../../../../stores/characterStore";
import { treasures } from "../../../../utils/data/treasures/treasures";
import { useGameStore } from "../../../../stores/gameStore";
import { ALL_ITEMS } from "../../../../utils/data/items/items";
import useNotification from "antd/es/notification/useNotification";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DirectionsButton from "../../Game-UI/DirectionsButton";

interface LocationProp {
    history: GameHistory
}


export default function TreasureEvent({ history }: LocationProp) {
    const { aiText, currentEvent } = history;
    const { addItemToInventory } = useCharacterStore();
    const { updateEventTakenStatus, updateEventOpenedStatus, movingToLocation } = useGameStore();
    const [api, contextHolder] = useNotification();

    const handleClick = () => {
        updateEventOpenedStatus()
    }

    const reward = ALL_ITEMS.find(item => item.id === currentEvent?.reward.id);
    if (!reward) throw new Error("Предмет не найден");


    const handleTakeItem = async () => {
        try {
            await addItemToInventory(reward.id, 1);
            updateEventTakenStatus();
        } catch {
            api.info({
                message: 'Инвентарь полон',
                description: 'Освободите место в инвентаре чтобы взять награду!',
                placement: 'topRight',
                duration: 2,
                className: 'custom-notification',
                icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
                closeIcon: null,
            });
        }
    }

    const handleMove = () => {
        movingToLocation(history.currentDirection)
    }


    return (
        <div>
            {contextHolder}
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
                        <DirectionsButton descr={'Отправиться дальше'} onClick={handleMove} />
                    </div>
                )
                }
            </div>
        </div>
    )
}