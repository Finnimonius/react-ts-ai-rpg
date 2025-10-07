import { useGameStore } from "../../../../stores/gameStore"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Forest.css'
import { NavigationButton } from "../../Game-UI/ActionButtons";
import Location from "../../Event/Location";
import TravelEvent from "../../Event/TravelEvent";

export default function Forest() {
    const { isLoading, isAddingHistory, startGame, gameHistory, backToCity } = useGameStore()

    return (
        <div className="forest-container">
            <NavigationButton
                onClick={startGame}
                descr={'Изучить локацию'}
                disabled={isLoading}
            />
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={backToCity}>Сбросить</button>

                {gameHistory.map((entry, index) => (
                    <div key={index} className="forest-message-block">
                        {entry.type === 'location' && <Location />}
                        {entry.type === 'travel_event' && <TravelEvent />}
                    </div>
                ))}

                {isAddingHistory && (
                    <div className="forest-message-block">
                        <Spin indicator={<LoadingOutlined spin />} />
                        <div>Мастер рассказывает историю...</div>
                    </div>
                )}
            </div>
        </div>
    )
}