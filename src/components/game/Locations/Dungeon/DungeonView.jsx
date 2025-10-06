import { useGameStore } from "../../../../stores/gameStore"
import Forest from "./Forest"

export default function DungeonView() {
    const { currentLocation } = useGameStore()

    return (
        <>
            {currentLocation === 'forest' ? <Forest /> : ''}
        </>

    )
}