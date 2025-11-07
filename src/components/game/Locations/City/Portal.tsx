import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../Game-UI/ActionButtons";
import LocationHeader from "../../Game-UI/LocationHeader";
import './Portal.css'
import type { CurrentLocation } from "../../../../types/game.types";

export default function Portal() {
    const navigate = useNavigate()

    const handleDungeon = (dungeonId: CurrentLocation) => {
        navigate(`/play/game/dungeon/${dungeonId}`)
    }

    return (
        <div className="portal-container">
            <LocationHeader location={'Портал'} />
            <div className="portal-buttons-container">
                <NavigationButton onClick={() => navigate('/play/game')} descr={'Назад'} />
                <NavigationButton onClick={() => handleDungeon('desert')} descr={'Пустыня'} />
                <NavigationButton onClick={() => handleDungeon('forest')} descr={'Древний лес'} />
            </div>
        </div>
    )
}