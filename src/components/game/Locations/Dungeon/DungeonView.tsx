import { Spin } from "antd"
import { useGameStore } from "../../../../stores/gameStore"
import TravelEvent from "../../Events/EventDispather"
import { NavigationButton } from "../../Game-UI/ActionButtons"
import { LoadingOutlined } from '@ant-design/icons';
import Location from "../../Events/Location";
import './DungeonView.css'
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import type { ALL_LOCATIONS } from "../../../../utils/data/locations/all-locations";

export default function DungeonView() {
    const { isLoading, startGame, game, deleteGame } = useGameStore();
    const { dungeonId } = useParams();

    const gameHisories = useMemo(() => (game?.gameHistories || []), [game]);
    return (
        <div className="forest-container">
            <NavigationButton
                onClick={() => startGame(dungeonId as keyof typeof ALL_LOCATIONS)}
                descr={'Изучить локацию'}
                disabled={gameHisories.length > 0}
            />
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={deleteGame} className="reset-test-btn">Сбросить</button>

                {gameHisories.map((history, index) => (
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