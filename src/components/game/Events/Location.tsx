import { useGameStore } from '../../../stores/gameStore'
import type { Directions, GameHistory } from '../../../types/game.types'
import { DIRECTION_NAMES } from '../../../utils/data/locations/all-locations'
import { NavigationButton } from '../Game-UI/ActionButtons'
import './Location.css'

interface LocationProp {
    history: GameHistory
}

export default function Location({ history }: LocationProp) {
    const { movingToLocation } = useGameStore()

    const handleClick = (directionId: Directions) => {
        movingToLocation(directionId)
    }

    return (
        <div>
            <p className='location-message-descr'>
                {history.aiText}
            </p>
            <div className='location-button-wrapper'>
                {history.directions?.map((direction, index) => {
                    return (
                        <NavigationButton
                            key={index}
                            descr={DIRECTION_NAMES[direction]}
                            onClick={() => handleClick(direction)}
                        />
                    )
                })}
            </div>
        </div>
    )
}