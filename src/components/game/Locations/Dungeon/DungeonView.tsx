import { Spin } from "antd"
import { useGameStore } from "../../../../stores/gameStore"
import TravelEvent from "../../Events/EventDispather"
import { NavigationButton } from "../../Game-UI/ActionButtons"
import { LoadingOutlined } from '@ant-design/icons';
import Location from "../../Events/Location";
import './DungeonView.css'
// import { useParams } from "react-router-dom";

export default function DungeonView() {
    const { isLoading, startGame, gameHistory, backToCity } = useGameStore()
    // const { dungeonId } = useParams()

    return (
        <div className="forest-container">
            <NavigationButton
                onClick={startGame}
                descr={'Изучить локацию'}
                disabled={gameHistory.length > 0}
            />
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={backToCity} className="reset-test-btn">Сбросить</button>

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