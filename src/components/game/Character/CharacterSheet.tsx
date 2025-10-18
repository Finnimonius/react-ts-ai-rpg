import { useNavigate } from "react-router-dom"
import { useCharacterStore } from "../../../stores/characterStore"
import './CharacterSheet.css'
import DraggableItem from "./DraggableItem"

export default function CharacterSheet() {
    const { reset, equipment } = useCharacterStore()
    const navigate = useNavigate()

    const handleReset = () => {
        reset()
        navigate('/play')
    }

    return (
        <div className="characterSheet-container">
            <button onClick={handleReset}>Сбросить персонажа</button>
            {Object.values(equipment)
                .filter(slot => slot !== null)
                .map(slot => (
                    <DraggableItem key={slot.id} item={slot} />
                ))}
        </div>
    )
}
