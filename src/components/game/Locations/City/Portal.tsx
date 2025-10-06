import { useNavigate } from "react-router-dom";
import { NavigationButton } from "../../Game-UI/ActionButtons";
import LocationHeader from "../../Game-UI/LocationHeader";
import './Portal.css'
import { useGameStore, type CurrentLocation } from "../../../../stores/gameStore";

export default function Portal() {
    const navigate = useNavigate()
    const { enterLocation } = useGameStore()

    const handleLocation = (location: CurrentLocation) => {
        enterLocation(location)
        navigate('/play/game/dungeon')
    }

    return (
        <div className="portal-container">
            <LocationHeader location={'Портал'} />
            <div className="portal-buttons-container">
                <NavigationButton onClick={() => navigate('/play/game')} descr={'Назад'} />
                <NavigationButton onClick={() => handleLocation('desert')} descr={'Пустыня'} />
                <NavigationButton onClick={() => handleLocation('forest')} descr={'Древний лес'} />
            </div>
        </div>
    )
}