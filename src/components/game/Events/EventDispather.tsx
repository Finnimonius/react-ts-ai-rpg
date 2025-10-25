import type { GameHistory } from "../../../types/game.types"
import TreasureEvent from "./Event/TreasureEvent"

interface LocationProp {
    history: GameHistory
}

export default function TravelEvent({ history }: LocationProp) {
    return (
        <>
            {history.currentEvent?.eventType === 'treasure' && <TreasureEvent history={history}/> }
        </>

    )
}