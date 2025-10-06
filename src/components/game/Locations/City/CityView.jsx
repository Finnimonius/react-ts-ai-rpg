import { useNavigate } from "react-router-dom"
import { NavigationButton } from "../../Game-UI/ActionButtons"
import './CityView.css'
import LocationHeader from "../../Game-UI/LocationHeader"

export default function CityView() {
    const navigate = useNavigate()

    return (
        <div style={{ padding: '100px 20px' }} className="city-districts">
            <LocationHeader location={'Город'} />
            <div className="city-buttons-container">
                <NavigationButton onClick={() => navigate('/play/game/market')} descr={'Рынок'} />
                <NavigationButton onClick={() => navigate('/play/game/tavern')} descr={'Таверна'} />
                <NavigationButton onClick={() => navigate('/play/game/blacksmith')} descr={'Кузнец'} />
                <NavigationButton onClick={() => navigate('/play/game/portal')} descr={'Портал'} />
            </div>
        </div>
    )
}