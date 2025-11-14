import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../Game-UI/ActionButtons";
import LocationHeader from "../../Game-UI/LocationHeader";
import './Portal.css';
import type { ALL_LOCATIONS } from "../../../../utils/data/locations/all-locations";

export default function Portal() {
    const navigate = useNavigate()

    const handleDungeon = (dungeonId: keyof typeof ALL_LOCATIONS) => {
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