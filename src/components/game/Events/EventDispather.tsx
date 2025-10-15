import type { GameHistory } from "../../../stores/gameStore"
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