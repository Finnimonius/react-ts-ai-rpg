import { useGameStore } from "../../../../stores/gameStore"
import { Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Forest.css'
import { NavigationButton } from "../../Game-UI/ActionButtons";

export default function Forest() {
    const { isLoading, startGame, gameHistory } = useGameStore()

    return (
        <div className="forest-container">
            <NavigationButton onClick={startGame} descr={'Изучить локацию'} style={{ width: 200 }} disabled={gameHistory.length > 0} />
            <div style={{ width: '100%' }} className="forest-messages-container">
                {gameHistory.map(history => (
                    <div className="forest-message-block">
                        {isLoading ?
                            <Spin indicator={<LoadingOutlined spin />} size="large" style={{ color: '#fff' }} />
                            :
                            <div>
                                <p className="forest-message-descr">{history.aiText}</p>
                                <div className="forest-button-wrapper">
                                    {history.directions.map(derection => <button>{derection}</button>)}
                                </div>
                            </div>

                        }
                    </div>
                ))}
            </div>
        </div>
    )
}