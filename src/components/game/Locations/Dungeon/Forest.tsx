import { useGameStore } from "../../../../stores/gameStore"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Forest.css'
import { NavigationButton } from "../../Game-UI/ActionButtons";
import Location from "../../Events/Location";
import TravelEvent from "../../Events/EventDispather";

export default function Forest() {
    const { isLoading, startGame, gameHistory, backToCity } = useGameStore()

    return (
        <div className="forest-container">
            <NavigationButton
                onClick={startGame}
                descr={'Изучить локацию'}
                disabled={gameHistory.length > 0}
            />
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={backToCity}>Сбросить</button>

                {gameHistory.map((history, index) => (
                    <div key={index} className="forest-message-block">
                        {history.type === 'location' && <Location history={history}/>}
                        {history.type === 'travel_event' && <TravelEvent history={history}/>}
                    </div>
                ))}

                {isLoading && (
                    <div className="forest-message-block">
                        <Spin indicator={<LoadingOutlined spin />} />
                        <p>Мастер рассказывает историю...</p>
                    </div>
                )}
            </div>
        </div>
    )
}