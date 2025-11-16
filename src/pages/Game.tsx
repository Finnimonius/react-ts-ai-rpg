import GameStart from './GameStart'
import ClassSelection from "./ClassSelection"
import Gameplay from './Gameplay'
import { useNavigate, useParams, Navigate } from "react-router-dom"
import { useCharacterStore } from "../stores/characterStore"
import './Game.css'
import BackgroundSelection from './BackgroundSelection'


export default function Game() {
    const navigate = useNavigate();
    const { step } = useParams();
    const hasCharacter = useCharacterStore(state => state.hasCharacter());

    const goToStep = (stepName: string) => {
        navigate(`/play/${stepName}`)
    }

    const getCurrentScreen = () => {
        switch (step) {
            case 'class': return 'class-selection'
            case 'background': return 'background-selection'
            case 'game': return 'gameplay'
            default: return 'main'
        }
    }

    const currentScreen = getCurrentScreen();

    if (hasCharacter && step !== 'game') {
        return <Navigate to="/play/game" replace />
    }

    if (!step && hasCharacter) {
        return <Navigate to="/play/game" replace />
    }

    if (step === 'game' && !hasCharacter) {
        return <Navigate to="/play" replace />
    }

    return (
        <section className='hero'>
            {currentScreen === 'main' && <GameStart onStartCreation={() => goToStep('class')} />}
            {currentScreen === 'class-selection' && <ClassSelection onNext={() => goToStep('background')} />}
            {currentScreen === 'background-selection' && <BackgroundSelection onNext={() => goToStep('game')} />}
            {currentScreen === 'gameplay' && <Gameplay />}
        </section>
    )
}