import { Spin } from "antd"
import { useGameStore } from "../../../../stores/gameStore"
import TravelEvent from "../../Events/EventDispather"
import { LoadingOutlined } from '@ant-design/icons';
import Location from "../../Events/Location";
import './DungeonView.css'
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { ALL_LOCATIONS } from "../../../../utils/data/locations/all-locations";

export default function DungeonView() {
    const { isLoading, startGame, game, deleteGame } = useGameStore();
    const { dungeonId } = useParams();
    const [visible, setVisible] = useState(game ? true : false);

    const handleStart = async () => {
        setVisible(true)
        try {
            await startGame(dungeonId as keyof typeof ALL_LOCATIONS);
        } catch {
            setVisible(false);
        }
    }

    const gameHisories = useMemo(() => (game?.gameHistories || []), [game]);
    return (
        <div className="forest-container">
            <button
                onClick={handleStart}
                className={`dungeon__button ${visible ? 'dungeon__button-disabled' : ''}`}
            >
                Изучить локацию
            </button>
            <div style={{ width: '100%' }} className="forest-messages-container">
                <button onClick={deleteGame} className="reset-test-btn">Сбросить</button>

                {gameHisories.map((history, index) => (
                    <div key={index} className="forest-message-block">
                        {history.type === 'location' && <Location history={history} />}
                        {history.type === 'travel_event' && <TravelEvent history={history} />}
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