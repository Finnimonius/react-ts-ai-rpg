import { Splitter, Menu, ConfigProvider } from 'antd';
import { AppstoreOutlined, AreaChartOutlined, DesktopOutlined, MailOutlined, ShopOutlined } from '@ant-design/icons';
import './Gameplay.css';
import CityView from "../components/game/Locations/City/CityView";
import Portal from "../components/game/Locations/City/Portal";
import Tavern from '../components/game/Locations/City/Tavern';
import Blacksmith from '../components/game/Locations/City/Blacksmith';
import DungeonView from '../components/game/Locations/Dungeon/DungeonView';
import { useRoutes } from 'react-router-dom';
import Market from '../components/game/Locations/City/Market';
import CharacterSheet from '../components/game/Character/CharacterSheet';

const gameRoutes = [
    { path: '/', element: <CityView /> },
    { path: '/portal', element: <Portal /> },
    { path: '/tavern', element: <Tavern /> },
    { path: '/blacksmith', element: <Blacksmith /> },
    { path: '/dungeon', element: <DungeonView /> },
    { path: '/market', element: <Market /> },
]

const items = [
    { key: '1', icon: <DesktopOutlined style={{ color: 'white' }} />, label: 'Option 1' },
    { key: '2', icon: <ShopOutlined style={{ color: 'white' }} />, label: 'Option 2' },
    { key: '3', icon: <AreaChartOutlined style={{ color: 'white' }} />, label: 'Option 3' },
    {
        key: 'sub1',
        label: 'Navigation One',
        icon: <MailOutlined style={{ color: 'white' }} />,
        children: [
            { key: '5', label: 'Option 5' },
            { key: '6', label: 'Option 6' },
            { key: '7', label: 'Option 7' },
            { key: '8', label: 'Option 8' },
        ],
    },
    {
        key: 'sub2',
        label: 'Navigation Two',
        icon: <AppstoreOutlined style={{ color: 'white' }} />,
        children: [
            { key: '9', label: 'Option 9' },
            { key: '10', label: 'Option 10' },
            {
                key: 'sub3',
                label: 'Submenu',
                children: [
                    { key: '11', label: 'Option 11' },
                    { key: '12', label: 'Option 12' },
                ],
            },
        ],
    },
];

export default function Gameplay() {
    const routing = useRoutes(gameRoutes)

    return (
        <div className="gameplay-container gameplay-layout">
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemSelectedBg: '#5d4037',
                            // itemSelectedColor: '#your-selected-text-color',
                            // itemHoverBg: '#your-hover-bg-color',
                            // itemHoverColor: '#your-hover-text-color',
                        },
                    },
                }}
            >
                <Menu
                    className="gameplay-menu"
                    mode="inline"
                    inlineCollapsed={true}
                    items={items}
                    theme="light"
                />
            </ConfigProvider>
            <ConfigProvider theme={{ components: { Splitter: { colorPrimary: '#1677ff', colorFill: 'white', controlItemBgActiveHover: 'rgb(0,0,0)', controlItemBgActive: 'rgb(0,0,0)'} } }}>
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