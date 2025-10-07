import { useGameStore } from "../../../../stores/gameStore"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Forest.css'
import { NavigationButton } from "../../Game-UI/ActionButtons";

export default function Forest() {
    const { isLoading, startGame, gameHistory, backToCity, movingToLocation } = useGameStore()

    return (
        <div className="forest-container">
            <NavigationButton onClick={startGame} descr={'Изучить локацию'} disabled={gameHistory.length > 0} />
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={backToCity}>Сбросить</button>
                {gameHistory.map((history, index) => (
                    <div className="forest-message-block">
                        {isLoading ?
                            <Spin indicator={<LoadingOutlined spin />} size="large" style={{ color: '#fff' }} />
                            :
                            <div key={index}>
                                <p className="forest-message-descr">{history.aiText}</p>
                                <div className="forest-button-wrapper">
                                    {history.directions.map([directionName, targetLocationId] => (
                                        <button onClick={() => movingToLocation(targetLocationId)}>{directionName}</button>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}