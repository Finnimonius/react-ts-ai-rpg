import { Splitter, ConfigProvider } from 'antd';
import './Gameplay.css';
import CityView from "../components/game/Locations/City/CityView";
import Portal from "../components/game/Locations/City/Portal";
import Tavern from '../components/game/Locations/City/Tavern';
import Blacksmith from '../components/game/Locations/City/Blacksmith';
import DungeonView from '../components/game/Locations/Dungeon/DungeonView';
import { useRoutes } from 'react-router-dom';
import Market from '../components/game/Locations/City/Market';
import CharacterSheet from '../components/game/Character/CharacterSheet';
import GameplayMenu from '../components/game/Game-UI/GameplayMenu';

const gameRoutes = [
    { path: '/', element: <CityView /> },
    { path: '/portal', element: <Portal /> },
    { path: '/tavern', element: <Tavern /> },
    { path: '/blacksmith', element: <Blacksmith /> },
    { path: '/dungeon/:dungeonId', element: <DungeonView /> },
    { path: '/market', element: <Market /> },
]

export default function Gameplay() {
    const routing = useRoutes(gameRoutes)

    return (
        <div className="gameplay-container gameplay-layout">
            <GameplayMenu />
            <ConfigProvider theme={{ components: { Splitter: { colorPrimary: '#1677ff', colorFill: 'white', controlItemBgActiveHover: 'rgb(0,0,0)', controlItemBgActive: 'rgb(0,0,0)' } } }}>
                <Splitter style={{ minHeight: '90vh', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <Splitter.Panel resizable={true} className="gameplay-splitter">
                        <div className="splitter-content-wrapper">
                            {routing}
                        </div>
                    </Splitter.Panel>
                    <Splitter.Panel min={'32%'} defaultSize={'32%'} max={'45%'} className="gameplat-splitter-character">
                        <CharacterSheet />
                    </Splitter.Panel>
                </Splitter>
            </ConfigProvider>
        </div>
    )
}
