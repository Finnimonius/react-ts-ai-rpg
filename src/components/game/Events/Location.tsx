import { memo, useState } from 'react';
import { useGameStore } from '../../../stores/gameStore';
import type { Directions, GameHistory } from '../../../types/game.types';
import { DIRECTION_NAMES } from '../../../utils/data/locations/all-locations';
import DirectionsButton from '../Game-UI/DirectionsButton';
import './Location.css'
import { usePrintText } from '../../../hooks/usePrintText';

interface LocationProp {
    history: GameHistory
}

function Location({ history }: LocationProp) {
    const movingToLocation = useGameStore(state => state.movingToLocation);
    const [print, isPrinting] = usePrintText(history.aiText)
    const [isMoving, setIsMoving] = useState(false);

    const handleClick = async (directionId: Directions) => {
        setIsMoving(true);
        try {
            await movingToLocation(directionId);
        } finally {
            setIsMoving(false);
        }
    }

    return (
        <div className='location-container'>
            <p className='location-message-descr'>
                {!history.isDirectionUsed ? print : history.aiText}
            </p>
            {(!history.isDirectionUsed && !isPrinting) && (
                <div className='location-button-wrapper'>
                    {history.directions?.map((direction, index) => {
                        return (
                            <DirectionsButton
                                key={index}
                                descr={DIRECTION_NAMES[direction]}
                                onClick={() => handleClick(direction)}
                                disabled={isMoving}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default memo(Location);