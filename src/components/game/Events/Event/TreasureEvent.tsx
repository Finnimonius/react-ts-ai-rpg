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
import { memo, useState } from "react";

interface LocationProp {
    history: GameHistory
}


function TreasureEvent({ history }: LocationProp) {
    const { aiText, currentEvent } = history;
    const addItemToInventory = useCharacterStore(state => state.addItemToInventory);
    const updateEventTakenStatus = useGameStore(state => state.updateEventTakenStatus);
    const updateEventOpenedStatus = useGameStore(state => state.updateEventOpenedStatus);
    const updateEventSkippedStatus = useGameStore(state => state.updateEventSkippedStatus);
    const movingToLocation = useGameStore(state => state.movingToLocation);

    const [api, contextHolder] = useNotification();
    const [isMoving, setIsMoving] = useState(false);

    const handleClick = () => {
        updateEventOpenedStatus()
    }

    const reward = ALL_ITEMS.find(item => item.id === currentEvent?.reward.id);
    if (!reward) throw new Error("Предмет не найден");


    const handleTakeItem = async () => {
        try {
            await addItemToInventory(reward.id, 1);
            await updateEventTakenStatus();
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

    const handleMove = async () => {
        setIsMoving(true);
        try {
            await updateEventSkippedStatus()
            await movingToLocation(history.currentDirection);
        } finally {
            setIsMoving(false);
        }
    }


    return (
        <div>
            {contextHolder}
            <p className="treasure-message-descr">{aiText}</p>
            <p className="treasure-message-descr treasure-message-descr-find">Вы находите:</p>
            <div className="treasure-buttons-wrapper">
                <button className="treasure-reward-btn" onClick={handleClick} disabled={currentEvent?.isOpened}>
                    <img className="treasure-reward-img" src={treasures[currentEvent?.rewardBox].img} alt={currentEvent?.eventType} />
                </button>
                {currentEvent?.isOpened && (
                    <div className="treasure-reward-wrapper">
                        <div onClick={(!currentEvent?.isTaken && !currentEvent?.isSkipped) ? handleTakeItem : undefined}
                            className={(!currentEvent?.isTaken && !currentEvent?.isSkipped) ? '' : 'treasure-reward-visibility'}
                        >
                            <DraggableItem
                                item={reward}
                                location="treasure-reward"
                            />
                        </div>
                        {currentEvent?.isTaken && <p className="treasure-message-descr treasure-message-descr-find">Вы получили награду !</p>}
                        {!history.isDirectionUsed && <DirectionsButton descr={'Отправиться дальше'} onClick={handleMove} disabled={isMoving} />}
                    </div>
                )
                }
            </div>
        </div>
    )
}

export default memo(TreasureEvent);