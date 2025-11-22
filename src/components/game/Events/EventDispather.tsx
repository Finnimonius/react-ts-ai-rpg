import type { GameHistory } from "../../../types/game.types"
import CombatEvent from "./Event/CombatEvent"
import TreasureEvent from "./Event/TreasureEvent"

interface LocationProp {
    history: GameHistory
}

export default function TravelEvent({ history }: LocationProp) {
    return (
        <>
            {history.currentEvent?.eventType === 'treasure' && <TreasureEvent history={history}/> }
            {history.currentEvent?.eventType === 'combat' && <CombatEvent history={history}/> }
        </>

    )
}