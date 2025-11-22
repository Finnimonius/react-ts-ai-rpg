import type { GameHistory } from "../../../../types/game.types"
import { ALL_ENEMIES } from "../../../../utils/data/enemies/enemies";
import './CombatEvent.css'

interface LocationProp {
    history: GameHistory
}

export default function CombatEvent({ history }: LocationProp) {
    const {aiText, currentEvent} = history;

    return (
        <div>
            <p className="combat-message-descr">{aiText}</p>
            <img className="combat-img-enemy" src={ALL_ENEMIES[currentEvent.enemy?.template.id]} alt="" />
        </div>
    )
}