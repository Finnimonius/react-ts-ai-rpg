import { useGameStore } from '../../../stores/gameStore'
import type { DirectionName, GameHistory, TargetLocation } from '../../../types/game.types'
import { NavigationButton } from '../Game-UI/ActionButtons'
import './Location.css'

interface LocationProp {
    history: GameHistory
}

export default function Location({ history }: LocationProp) {
    const { movingToLocation } = useGameStore()

    const handleClick = (direction: TargetLocation, directionName: DirectionName) => {
        movingToLocation(direction, directionName)
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
                            descr={direction}
                            onClick={() => handleClick(direction.targetLocationId, direction.directionName)}
                        />
                    )
                })}
            </div>
        </div>
    )
}