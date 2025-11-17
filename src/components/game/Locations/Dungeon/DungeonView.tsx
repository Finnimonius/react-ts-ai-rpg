import { Spin } from "antd"
import { useGameStore } from "../../../../stores/gameStore"
import TravelEvent from "../../Events/EventDispather"
import { LoadingOutlined } from '@ant-design/icons';
import Location from "../../Events/Location";
import './DungeonView.css'
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import type { ALL_LOCATIONS } from "../../../../utils/data/locations/all-locations";
import DirectionsButton from "../../Game-UI/DirectionsButton";

function DungeonView() {
    const isLoading = useGameStore(state => state.isLoading);
    const startGame = useGameStore(state => state.startGame);
    const game = useGameStore(state => state.game);
    const deleteGame = useGameStore(state => state.deleteGame);

    const { dungeonId } = useParams();
    const [visible, setVisible] = useState(game ? true : false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleStart = async () => {
        setVisible(true)
        try {
            await startGame(dungeonId as keyof typeof ALL_LOCATIONS);
        } catch {
            setVisible(false);
        }
    }

    const gameHisories = useMemo(() => (game?.gameHistories || []), [game]);

    useEffect(() => {
        const scrollContainer = document.querySelector('.splitter-content-wrapper');
        if (scrollContainer) {
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [gameHisories, isLoading]);

    return (
        <div className="forest-container">
            <DirectionsButton
                onClick={handleStart}
                descr={'Изучить локацию'}
                className={visible ? 'dungeon__button-disabled' : ''}
            />
            <div className="forest-messages-container" ref={containerRef}>
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
                        <p className="forest-message-descr">Мастер рассказывает историю...</p>
                    </div>
                )}

            </div>
        </div>
    )
}

export default memo(DungeonView);